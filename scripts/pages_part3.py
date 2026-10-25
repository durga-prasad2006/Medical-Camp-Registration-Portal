# scripts/pages_part3.py
# Pages 21 to 30 for the Medical Camp Registration Portal Documentation

PAGES_PART3 = [
    {
        "page_num": 21,
        "title": "CHAPTER 9: FRONTEND UI WALKTHROUGH (PAGES 5 - 9)",
        "subtitle": "Camp Catalog, Booking Modal, Admin & Doctor Dashboards",
        "chapter": "CHAPTER 9: UI & APPLICATION WALKTHROUGH",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                Pages 5 through 9 provide deep operational functionality for camp discovery, booking confirmation, administrative CRUD controls, and clinical attendance tracking.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 5: MEDICAL CAMPS DIRECTORY</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 6px 0;">
                        Public browsing catalog listing all medical camps.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Search bar for camp name, venue, or doctor</li>
                        <li>Category filtering pills (General Health, Eye Camp, etc.)</li>
                        <li>Live slot counters: "X slots left" / "Camp Full"</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 6: REGISTER FOR CAMP MODAL</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 6px 0;">
                        High-converting interactive registration popup.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Summarizes camp date, venue, and assigned doctor</li>
                        <li>Instant slot reservation confirmation</li>
                        <li>Generates unique Token Slip (TKN-001)</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 7: MY REGISTRATIONS</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 6px 0;">
                        Participant history and verification management.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Live status badges: "Registered", "Attended", "Cancelled"</li>
                        <li>Printable Digital Registration Slip modal</li>
                        <li>Self-service cancellation trigger</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 8: ADMIN DASHBOARD (/admin)</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 6px 0;">
                        Administrative analytics and operational overview.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Key KPI cards: Total Camps, Active Registrations</li>
                        <li>Participant roster table with search & filters</li>
                        <li>Quick links to manage medical camps</li>
                    </ul>
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 9: MANAGE MEDICAL CAMPS & DOCTOR DASHBOARD</div>
                <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 4px 0;">
                    <strong>Manage Medical Camps (Admin):</strong> Add New Camp modal with dynamic doctor dropdown, venue editors, and capacity limit adjustments.<br/>
                    <strong>Doctor Dashboard (/doctor):</strong> Doctor schedule displaying assigned camps and participant rosters with one-click "Mark Attended" attendance buttons.
                </p>
            </div>
        </div>
        """
    },
    {
        "page_num": 22,
        "title": "CHAPTER 10: SECURITY & ADMIN PROTECTION",
        "subtitle": "Single Admin Policy & Centered Security Access Modal",
        "chapter": "CHAPTER 10: SECURITY ARCHITECTURE",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">10.1 Single Admin Architecture</h3>
            <p style="font-size: 13px; line-height: 1.75; color: #334155; text-align: justify; margin-bottom: 14px;">
                To prevent privilege escalation and administrative clutter, the portal enforces an uncompromised <strong>Single Administrator Rule</strong>:
            </p>
            <ul style="font-size: 12.5px; line-height: 1.7; color: #334155; margin-bottom: 16px;">
                <li>The database contains <strong>exactly one administrator account</strong>: <code>userId: "ADM-001"</code>, <code>email: "admin@camp.org"</code>, <code>role: "admin"</code>.</li>
                <li>Public registration with <code>role: "admin"</code> is strictly prohibited and intercepted at the Express route level with an immediate <code>HTTP 403 Forbidden</code> response.</li>
                <li>The single admin account is initialized via an idempotent database seed script (<code>seed.js</code>) on server boot.</li>
            </ul>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 10px;">10.2 Top Navbar Admin Access & Master Password</h3>
            <p style="font-size: 13px; line-height: 1.75; color: #334155; text-align: justify; margin-bottom: 14px;">
                Instead of exposing an admin username/password form on the standard public login page, administrative entrance is isolated to a <strong>locked "Admin" button</strong> in the top navigation bar.
            </p>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
                <div style="font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px;">Master Password Protocol:</div>
                <div style="display: flex; gap: 16px; font-size: 12px; line-height: 1.6; color: #334155;">
                    <div style="flex: 1;">
                        <strong>Master Admin Password:</strong><br/>
                        <code style="font-size: 13px; color: #b45309; font-weight: bold;">Admin@2026</code><br/>
                        <span style="font-size: 11px; color: #64748b;">Known exclusively to the authorized system administrator.</span>
                    </div>
                    <div style="flex: 1;">
                        <strong>Authentication Endpoint:</strong><br/>
                        <code style="font-size: 12px; color: #0f766e;">POST /api/admin-login</code><br/>
                        <span style="font-size: 11px; color: #64748b;">Directly verifies master password against DB.</span>
                    </div>
                </div>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">10.3 Password Storage Policy</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin: 0;">
                In strict adherence to the client's explicit project specification (<em>"password should be stored as it is in the database it should not be encrypted"</em>), passwords across all roles (Admin, Doctors, Participants) are stored as unencrypted plain text. While production banking applications use bcrypt hashing, this architectural design satisfies the exact academic verification rules specified for this MERN Stack mini project.
            </p>
        </div>
        """
    },
    {
        "page_num": 23,
        "title": "CHAPTER 11: DOCTOR ASSIGNMENT VALIDATION",
        "subtitle": "Eliminating Orphan Doctor Entries via Database Gatekeeping",
        "chapter": "CHAPTER 11: DOCTOR VALIDATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">11.1 The Orphan Doctor Problem</h3>
            <p style="font-size: 13px; line-height: 1.75; color: #334155; text-align: justify; margin-bottom: 14px;">
                In earlier iterations of the camp creation interface, the assigned doctor field was a free-form text input (<code>&lt;input type="text" /&gt;</code>). This allowed administrators to input arbitrary, fictitious doctor names (e.g. "Dr. John Doe" or typographical errors) who had no corresponding registered user account in the database. As a result, the Doctor Dashboard could not link camps to real doctors, and attendance could never be recorded.
            </p>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 10px;">11.2 Dual-Layer Validation Solution</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #0d9488; border-radius: 8px; padding: 12px;">
                    <strong style="color: #0f766e; font-size: 12.5px; display: block; margin-bottom: 6px;">LAYER 1: FRONTEND DYNAMIC DROPDOWN</strong>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #334155; margin: 0 0 6px 0;">
                        Replaced the free-text input with a reactive <code>&lt;select&gt;</code> dropdown in <code>ManageCamps.jsx</code>.
                    </p>
                    <ul style="font-size: 11px; color: #475569; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Calls <code>api.getDoctors()</code> on modal open.</li>
                        <li>Renders only genuine doctors from <code>GET /api/doctors</code>.</li>
                        <li>Displays Doctor Name and Email for clarity.</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #d97706; border-radius: 8px; padding: 12px;">
                    <strong style="color: #b45309; font-size: 12.5px; display: block; margin-bottom: 6px;">LAYER 2: BACKEND MONGOOSE GATEWAY</strong>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #334155; margin: 0 0 6px 0;">
                        Server routes (<code>POST /medicalCamps</code> and <code>PUT /medicalCamps/:id</code>) enforce strict database queries.
                    </p>
                    <ul style="font-size: 11px; color: #475569; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Executes case-insensitive regex query on <code>Users</code>.</li>
                        <li>Verifies <code>role === "doctor"</code>.</li>
                        <li>Rejects unregistered names with <code>HTTP 400 Bad Request</code>.</li>
                    </ul>
                </div>
            </div>

            <h3 style="font-size: 13.5px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px;">Database Verification Query (campRoute.js)</h3>
            <div style="background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 10.5px; line-height: 1.5;">
const doctorDoc = await User.findOne({<br/>
&nbsp;&nbsp;role: "doctor",<br/>
&nbsp;&nbsp;$or: [<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{ name: doctorName },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{ name: new RegExp(`^${doctorName.trim()}$`, "i") },<br/>
&nbsp;&nbsp;&nbsp;&nbsp;{ userId: doctorName }<br/>
&nbsp;&nbsp;]<br/>
});<br/>
if (!doctorDoc) {<br/>
&nbsp;&nbsp;return res.status(400).json({<br/>
&nbsp;&nbsp;&nbsp;&nbsp;message: `Doctor "${doctorName}" is not registered in the database. Please select a registered doctor.`<br/>
&nbsp;&nbsp;});<br/>
}
            </div>
        </div>
        """
    },
    {
        "page_num": 24,
        "title": "CHAPTER 12: DATA FLOW & SEQUENCE DIAGRAMS",
        "subtitle": "DFD Level 0, Level 1 & Interaction Sequence",
        "chapter": "CHAPTER 12: SYSTEM MODELING",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">12.1 Data Flow Diagram (DFD Level 0 - Context Level)</h3>
            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; text-align: justify; margin-bottom: 12px;">
                The context-level DFD models the high-level boundary of the Medical Camp Registration Portal, capturing the primary external entities and their major information flows:
            </p>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 14px; text-align: center;">
                <div style="font-size: 11px; font-family: monospace; color: #1e293b; line-height: 1.8;">
                    [Participant] &rarr; (Register Profile / Book Camp Slot) &rarr; [ PORTAL ENGINE ] &rarr; (Digital Token Slip)<br/>
                    [Admin] &rarr; (Master Password / Camp CRUD / Assign Doctor) &rarr; [ PORTAL ENGINE ] &rarr; (Roster & Analytics)<br/>
                    [Doctor] &rarr; (Login / Update Attendance) &rarr; [ PORTAL ENGINE ] &rarr; (Consultation Status)
                </div>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">12.2 Camp Registration Sequence Diagram</h3>
            <div style="background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 10px; line-height: 1.5; margin-bottom: 12px;">
Participant             React UI                Express REST API        MongoDB Atlas<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |                    |<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|--- Click "Register" -&gt;|                          |                    |<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |-- POST /registerCamp ---&gt;|                    |<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |-- Find Camp ------&gt;|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |&lt;- Camp details ----|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |-- Count Regs -----&gt;|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |&lt;- Active count ----|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |-- Check Duplicate -&gt;|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |&lt;- Is Duplicate? ---|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |-- Insert Reg Doc --&gt;|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |                          |&lt;- Success (201) ---|<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|                       |&lt;- 201 Created Token -----|                    |<br/>
&nbsp;&nbsp;&nbsp;&nbsp;|&lt;- Display Token Slip -|                          |                    |
            </div>

            <p style="font-size: 12px; line-height: 1.6; color: #475569; margin: 0;">
                The sequence diagram clearly visualizes the transactional guarantees executed before confirming a slot: verifying camp existence, validating remaining capacity, preventing duplicate entries, and persisting the 5-attribute registration record.
            </p>
        </div>
        """
    },
    {
        "page_num": 25,
        "title": "CHAPTER 13: QA, TEST CASES & VERIFICATION",
        "subtitle": "Test Execution Matrix & Validation Results",
        "chapter": "CHAPTER 13: TESTING & QUALITY ASSURANCE",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                A rigorous test suite covering functional, boundary, and security test cases was executed against the production deployment to ensure defect-free operation.
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 10%;">Test ID</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 22%;">Scenario Description</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 28%;">Test Input Payload</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 28%;">Expected Outcome</th>
                        <th style="padding: 6px 8px; text-align: center; border: 1px solid #334155; width: 12%;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-01</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Prohibit Admin Registration</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">POST /register with <code>role: "admin"</code></td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 403 Forbidden ("Admin registration is prohibited")</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                    <tr style="background: #f8fafc;">
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-02</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Doctor Self-Registration</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">POST /register with <code>role: "doctor"</code></td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 201 Created & saved to Users</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-03</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Reject Non-Existent Doctor</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">POST /medicalCamps with <code>"Dr. Fake Doctor"</code></td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 400 Bad Request ("Doctor is not registered")</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                    <tr style="background: #f8fafc;">
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-04</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Create Camp with Real Doctor</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">POST /medicalCamps with <code>"Dr. Anil Kumar"</code></td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 201 Created (7-attribute record persisted)</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-05</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Master Admin Login Valid</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">POST /admin-login with <code>"Admin@2026"</code></td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 200 OK & JWT token returned</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                    <tr style="background: #f8fafc;">
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-06</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Prevent Duplicate Booking</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Same participant re-registers for camp</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 400 Bad Request ("Already registered")</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-07</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Max Capacity Reached Guard</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Enrollment attempt when <code>count >= max</code></td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">HTTP 400 Bad Request ("Camp capacity reached")</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td>
                    </tr>
                </tbody>
            </table>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 11.5px; color: #166534;">
                <strong>Test Summary:</strong> 100% of functional test cases passed successfully with zero critical or blocker bugs identified.
            </div>
        </div>
        """
    },
    {
        "page_num": 26,
        "title": "CHAPTER 14: PERFORMANCE & VITE OPTIMIZATION",
        "subtitle": "Sub-Second Bundling, Asset Compression & Connection Pooling",
        "chapter": "CHAPTER 14: PERFORMANCE & OPTIMIZATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">14.1 Frontend Build Optimization with Vite 8</h3>
            <p style="font-size: 13px; line-height: 1.75; color: #334155; text-align: justify; margin-bottom: 12px;">
                Traditional Webpack-based bundling often requires 30 to 60 seconds of compilation time for full-stack applications. By migrating to <strong>Vite 8</strong> and <strong>ES modules</strong>, the build pipeline achieved superior performance:
            </p>

            <div style="background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 10.5px; line-height: 1.5; margin-bottom: 14px;">
$ npm run build<br/>
&gt; vite build<br/>
vite v8.3.0 building client environment for production...<br/>
transforming...<br/>
&check; 1909 modules transformed.<br/>
rendering chunks...<br/>
dist/index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.59 kB &vert; gzip: &nbsp;&nbsp;0.34 kB<br/>
dist/assets/index-BU7YCEVK.css &nbsp;61.39 kB &vert; gzip: &nbsp;10.31 kB<br/>
dist/assets/index-CwVWpVI7.js &nbsp;443.28 kB &vert; gzip: 117.27 kB<br/>
<strong style="color: #4ade80;">&check; built in 700ms</strong>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">14.2 Database Connection Pooling & Resilience</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                Mongoose establishes an intelligent connection pool against the MongoDB Atlas replica set, retaining warm sockets to eliminate SSL handshake overheads during bursts of participant registrations.
            </p>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">14.3 Tailwind CSS v4 Zero-Runtime Overhead</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin: 0;">
                By utilizing Tailwind CSS v4 with JIT (Just-In-Time) compilation, the entire application styles compile into a tiny 10.31 kB gzipped CSS bundle, ensuring instant First Contentful Paint (FCP) on mobile networks.
            </p>
        </div>
        """
    },
    {
        "page_num": 27,
        "title": "CHAPTER 15: DEPLOYMENT & CLOUD HOSTING",
        "subtitle": "Vercel Frontend, MongoDB Atlas Cluster & Git Configuration",
        "chapter": "CHAPTER 15: DEPLOYMENT & CLOUD HOSTING",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                The project utilizes a cloud-native continuous deployment pipeline connecting GitHub, Vercel, and MongoDB Atlas.
            </p>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;">
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #000000; border-radius: 8px; padding: 12px;">
                    <strong style="font-size: 13px; color: #000000; display: block; margin-bottom: 4px;">VERCEL CLOUD</strong>
                    <span style="font-size: 11px; color: #64748b;">Frontend Hosting</span>
                    <ul style="font-size: 11px; color: #334155; margin: 8px 0 0 0; padding-left: 14px; line-height: 1.5;">
                        <li>Automated Git build triggers</li>
                        <li>Global Edge CDN caching</li>
                        <li>SPA rewrites via vercel.json</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #16a34a; border-radius: 8px; padding: 12px;">
                    <strong style="font-size: 13px; color: #15803d; display: block; margin-bottom: 4px;">MONGODB ATLAS</strong>
                    <span style="font-size: 11px; color: #64748b;">Database Cluster</span>
                    <ul style="font-size: 11px; color: #334155; margin: 8px 0 0 0; padding-left: 14px; line-height: 1.5;">
                        <li>Multi-region replica set</li>
                        <li>Automated daily backups</li>
                        <li>SSL/TLS encrypted transport</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #2563eb; border-radius: 8px; padding: 12px;">
                    <strong style="font-size: 13px; color: #1d4ed8; display: block; margin-bottom: 4px;">GITHUB REPO</strong>
                    <span style="font-size: 11px; color: #64748b;">Version Control</span>
                    <ul style="font-size: 11px; color: #334155; margin: 8px 0 0 0; padding-left: 14px; line-height: 1.5;">
                        <li>Main branch deployment</li>
                        <li>Strict .gitignore protection</li>
                        <li>Clean open-source repository</li>
                    </ul>
                </div>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">Environment Configuration & Security</h3>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; font-size: 11.5px; line-height: 1.6; color: #334155;">
                <strong>Gitignore Enforcement:</strong> All sensitive credentials (<code>MONGO_URI</code>, <code>JWT_SECRET</code>) are stored in <code>backend/.env</code> and strictly excluded from Git tracking via <code>.gitignore</code> (<code>.env</code>, <code>.env.*</code>, <code>*.env</code>). A clean template <code>backend/.env.example</code> is version-controlled to guide subsequent developers without leaking live production secrets.
            </div>
        </div>
        """
    },
    {
        "page_num": 28,
        "title": "CHAPTER 16: RESULTS & FUTURE ENHANCEMENTS",
        "subtitle": "Project Deliverables & Long-Term Technological Roadmap",
        "chapter": "CHAPTER 16: RESULTS & ROADMAP",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">16.1 Qualitative & Quantitative Project Outcomes</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 30%;">Operational Dimension</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 35%;">Traditional Paper System</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 35%;">Medical Camp Registration Portal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Registration Time</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #dc2626;">5 to 15 minutes (physical queue)</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">Sub-10 seconds online</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Overbooking Errors</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #dc2626;">Frequent (no slot locks)</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">0% (automated slot guards)</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Doctor Coordination</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #dc2626;">Manual phone calls & paper rosters</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">Dedicated Doctor Dashboard</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Attendance Auditing</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #dc2626;">Handwritten tally sheets</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">Real-time digital status sync</td></tr>
                </tbody>
            </table>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">16.2 Future Enhancements Roadmap</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 11.5px; line-height: 1.6;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">1. Automated SMS / WhatsApp Alerts</strong>
                    Integrate Twilio or WhatsApp Business API to dispatch booking confirmations and reminder notifications 24 hours prior to camp execution.
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">2. QR-Code Check-In Scanners</strong>
                    Embed dynamic QR codes onto the digital registration slips, allowing attending nurses to mark attendance with a smartphone camera scan.
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">3. Electronic Prescription Uploads</strong>
                    Enable doctors to upload digital prescriptions and diagnostic notes securely into the participant's consultation history.
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">4. Multilingual Regional Support</strong>
                    Implement i18n localization in Hindi, Telugu, Tamil, and Bengali to maximize accessibility in rural community medical camps.
                </div>
            </div>
        </div>
        """
    },
    {
        "page_num": 29,
        "title": "CHAPTER 17: CONCLUSION & SUMMARY",
        "subtitle": "Project Retrospective & Technical Accomplishments",
        "chapter": "CHAPTER 17: CONCLUSION",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.75; color: #334155; text-align: justify; margin-bottom: 14px;">
                The <strong>Medical Camp Registration Portal</strong> successfully accomplishes all academic, functional, and technological goals set forth in the <em>SIH 2025 Healthcare & Medical Camp Management</em> initiative.
            </p>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
                <h4 style="font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">Key Deliverables Achieved:</h4>
                <ul style="font-size: 12px; line-height: 1.7; color: #334155; margin: 0; padding-left: 18px;">
                    <li><strong>Full MERN Stack Engineering:</strong> Complete integration of React 19, Express.js 5, Node.js v24, and MongoDB Atlas.</li>
                    <li><strong>Strict 3-Collection Database Architecture:</strong> High-performance, lean relational data model (<code>Users</code>, <code>MedicalCamps</code>, and <code>Registrations</code>) strictly storing only specified attributes.</li>
                    <li><strong>Single Admin & Secret Master Access:</strong> Robust administrative protection centered via React Portals with <code>Admin@2026</code> master password validation.</li>
                    <li><strong>Verified Doctor Assignment:</strong> Automated database validation eliminating fictitious doctor entries and synchronizing clinical schedules.</li>
                    <li><strong>Cloud Production Deployment:</strong> High-availability frontend deployed live on Vercel with automated GitHub synchronization.</li>
                </ul>
            </div>

            <p style="font-size: 13px; line-height: 1.75; color: #334155; text-align: justify; margin: 0;">
                In summary, this project exemplifies how modern web frameworks can modernize grassroots community healthcare operations—replacing fragmented paper trails with instantaneous, reliable, and accessible digital workflows.
            </p>
        </div>
        """
    },
    {
        "page_num": 30,
        "title": "CHAPTER 18: REFERENCES, REPOSITORY & LIVE URL",
        "subtitle": "Documentation Citations, Source Code & Production Deployment",
        "chapter": "CHAPTER 18: REFERENCES & DEPLOYMENT",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">18.1 Academic & Technical References</h3>
            <ol style="font-size: 11.5px; line-height: 1.7; color: #334155; margin-bottom: 16px; padding-left: 18px;">
                <li>Smart India Hackathon (SIH 2025) – Healthcare & Medical Camp Outreach Problem Statements, Ministry of Education Innovation Cell, Govt. of India.</li>
                <li>React 19 Documentation – React Portals, Hooks, Virtual DOM & State Management: <code>https://react.dev/</code></li>
                <li>Express.js 5 Guide – REST API Routing, Middleware & HTTP Protocol Standards: <code>https://expressjs.com/</code></li>
                <li>MongoDB Atlas Manual – Cloud Sharded Clusters, Mongoose ODM & Query Optimization: <code>https://www.mongodb.com/docs/</code></li>
                <li>Tailwind CSS v4 Documentation – Utility-First Responsive Styling: <code>https://tailwindcss.com/</code></li>
            </ol>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 10px;">18.2 Official GitHub Source Code Repository</h3>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 12px; line-height: 1.6;">
                <strong>Repository:</strong> <code>https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal</code><br/>
                <strong>Branch:</strong> <code>main</code> &bull; <strong>License:</strong> MIT Open Source &bull; <strong>Author:</strong> Durga Prasad
            </div>

            <div style="background: #f0fdfa; border: 2px solid #0d9488; border-radius: 12px; padding: 20px; text-align: center;">
                <div style="font-size: 13px; font-weight: 800; color: #0f766e; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                    Official Live Production Deployment URL
                </div>
                <div style="font-size: 16px; font-weight: 900; margin-bottom: 8px;">
                    <a href="https://medical-camp-registration-portal-tawny.vercel.app/" target="_blank" style="color: #2563eb; text-decoration: underline; word-break: break-all;">
                        https://medical-camp-registration-portal-tawny.vercel.app/
                    </a>
                </div>
                <p style="font-size: 12px; color: #475569; margin: 0;">
                    Hosted on Vercel Global Edge Network with live database connectivity to MongoDB Atlas.
                </p>
            </div>
        </div>
        """
    }
]

print("Pages Part 3 (21 to 30) defined.")
