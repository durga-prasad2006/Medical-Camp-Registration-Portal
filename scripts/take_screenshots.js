// scripts/take_screenshots.js
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(__dirname, '..', 'documentation_assets', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function main() {
    console.log("Starting Chrome Headless with Remote Debugging...");
    const chrome = spawn(chromePath, [
        '--headless=new',
        '--remote-debugging-port=9222',
        '--user-data-dir=' + path.join(__dirname, '..', 'chrome_cdp_profile'),
        '--window-size=1280,800',
        'about:blank'
    ]);

    await delay(2000);

    // Get active WebSocket debugger URL
    const versionData = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9222/json/list', (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(JSON.parse(body)));
        }).on('error', reject);
    });

    const pageUrl = versionData[0].webSocketDebuggerUrl;
    console.log("Connected to Chrome:", pageUrl);

    // Simple WebSocket client using Node.js built-in WebSocket (available in Node 22+)
    const ws = new WebSocket(pageUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function sendCommand(method, params = {}) {
        return new Promise((resolve) => {
            const currentId = id++;
            const handler = (event) => {
                const msg = JSON.parse(event.data);
                if (msg.id === currentId) {
                    ws.removeEventListener('message', handler);
                    resolve(msg.result);
                }
            };
            ws.addEventListener('message', handler);
            ws.send(JSON.stringify({ id: currentId, method, params }));
        });
    }

    await sendCommand('Page.enable');

    const tasks = [
        {
            name: '01_home.png',
            url: 'http://localhost:3000/',
            prep: null
        },
        {
            name: '02_camps.png',
            url: 'http://localhost:3000/camps',
            prep: null
        },
        {
            name: '03_login.png',
            url: 'http://localhost:3000/login',
            prep: null
        },
        {
            name: '04_register.png',
            url: 'http://localhost:3000/register',
            prep: null
        },
        {
            name: '05_participant_dashboard.png',
            url: 'http://localhost:3000/participant',
            prep: `localStorage.setItem('mcrp_current_user', JSON.stringify({ userId: 'USR-PAR-001', name: 'Rahul Verma', email: 'rahul@gmail.com', role: 'participant', phone: '+91 98765 43210', bloodGroup: 'O+' }));`
        },
        {
            name: '06_my_registrations.png',
            url: 'http://localhost:3000/my-registrations',
            prep: `localStorage.setItem('mcrp_current_user', JSON.stringify({ userId: 'USR-PAR-001', name: 'Rahul Verma', email: 'rahul@gmail.com', role: 'participant', phone: '+91 98765 43210', bloodGroup: 'O+' }));`
        },
        {
            name: '07_profile.png',
            url: 'http://localhost:3000/profile',
            prep: `localStorage.setItem('mcrp_current_user', JSON.stringify({ userId: 'USR-PAR-001', name: 'Rahul Verma', email: 'rahul@gmail.com', role: 'participant', phone: '+91 98765 43210', bloodGroup: 'O+', age: '24', address: 'Hostel Block 4, Room 302, Campus', emergencyContact: 'Father (+91 91234 56789)' }));`
        },
        {
            name: '08_admin_dashboard.png',
            url: 'http://localhost:3000/admin',
            prep: `localStorage.setItem('mcrp_current_user', JSON.stringify({ userId: 'ADM-001', name: 'System Administrator', email: 'admin@camp.org', role: 'admin' }));`
        },
        {
            name: '09_manage_camps.png',
            url: 'http://localhost:3000/admin/camps',
            prep: `localStorage.setItem('mcrp_current_user', JSON.stringify({ userId: 'ADM-001', name: 'System Administrator', email: 'admin@camp.org', role: 'admin' }));`
        },
        {
            name: '10_doctor_dashboard.png',
            url: 'http://localhost:3000/doctor',
            prep: `localStorage.setItem('mcrp_current_user', JSON.stringify({ userId: 'USR-DOC-001', name: 'Dr. Rajesh Sharma', email: 'dr.sharma@health.org', role: 'doctor' }));`
        }
    ];

    for (const task of tasks) {
        console.log(`Capturing ${task.name}...`);
        await sendCommand('Page.navigate', { url: 'http://localhost:3000/' });
        await delay(500);

        if (task.prep) {
            await sendCommand('Runtime.evaluate', { expression: task.prep });
        }

        await sendCommand('Page.navigate', { url: task.url });
        await delay(1200);

        const shot = await sendCommand('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, task.name), Buffer.from(shot.data, 'base64'));
        console.log(`Saved: ${task.name}`);
    }

    ws.close();
    chrome.kill();
    console.log("All screenshots successfully captured!");
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
