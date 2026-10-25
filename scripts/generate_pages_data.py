# scripts/generate_pages_data.py
import os
import json

pages = [
    {
        "page_num": 1,
        "title": "PROJECT 2: MERN STACK MINI PROJECT",
        "subtitle": "Medical Camp Registration Portal",
        "chapter": "TITLE & COVER PAGE",
        "content_html": """
        <div style="text-align: center; padding-top: 40px; padding-bottom: 20px;">
            <div style="font-size: 13px; font-weight: 800; letter-spacing: 2px; color: #0d9488; text-transform: uppercase; margin-bottom: 12px;">MERN Stack Full-Stack Mini Project</div>
            <h1 style="font-size: 32px; font-weight: 900; color: #0f172a; margin-bottom: 10px; line-height: 1.2;">MEDICAL CAMP REGISTRATION PORTAL</h1>
            <p style="font-size: 16px; font-weight: 600; color: #475569; margin-bottom: 30px;">(Inspired by SIH 2025 – Healthcare & Medical Camp Management)</p>
            
            <div style="display: inline-block; padding: 12px 24px; background: #f0fdfa; border: 2px solid #0d9488; border-radius: 12px; margin-bottom: 45px;">
                <span style="font-size: 14px; font-weight: 700; color: #0f766e;">Comprehensive 30-Page Technical Project Documentation Report</span>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; max-width: 620px; margin: 0 auto 40px auto; text-align: left;">
                <h3 style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Project Metadata & Submission Details</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b; width: 38%;">Project Title:</td><td style="padding: 6px 0; font-weight: 700; color: #0f172a;">Medical Camp Registration Portal</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Framework / Architecture:</td><td style="padding: 6px 0; color: #0f172a;">MERN Stack (MongoDB, Express.js, React, Node.js)</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Candidate / Author:</td><td style="padding: 6px 0; font-weight: 700; color: #0d9488;">Durga Prasad</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">GitHub Profile:</td><td style="padding: 6px 0; color: #0f172a;">durga-prasad2006</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Official Repository:</td><td style="padding: 6px 0; color: #0f172a;">Medical-Camp-Registration-Portal</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Primary Theme:</td><td style="padding: 6px 0; color: #0f172a;">SIH 2025 Smart Healthcare & Community Outreach</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Database Provider:</td><td style="padding: 6px 0; color: #0f172a;">MongoDB Atlas Cloud (3-Collection Strict Schema)</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Frontend Tooling:</td><td style="padding: 6px 0; color: #0f172a;">React 19, Vite 8, Tailwind CSS v4, Lucide Icons</td></tr>
                    <tr><td style="padding: 6px 0; font-weight: 700; color: #64748b;">Live Deployment URL:</td><td style="padding: 6px 0; font-weight: 700; color: #2563eb;">https://medical-camp-registration-portal-tawny.vercel.app/</td></tr>
                </table>
            </div>

            <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
                <strong>Academic Session:</strong> 2026 &bull; <strong>Document Version:</strong> 2.0 Production Release<br/>
                <em>Department of Computer Science & Engineering / Information Technology</em>
            </div>
        </div>
        """
    },
    {
        "page_num": 2,
        "title": "CERTIFICATE & DECLARATION",
        "subtitle": "Official Academic & Technical Verification",
        "chapter": "PRELIMINARY PAGES",
        "content_html": """
        <div style="padding: 15px 0;">
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">Certificate of Completion</h2>
                <div style="width: 80px; height: 3px; background: #0d9488; margin: 0 auto;"></div>
            </div>

            <p style="font-size: 14px; line-height: 1.8; color: #334155; text-align: justify; margin-bottom: 24px;">
                This is to certify that the project entitled <strong>"Medical Camp Registration Portal"</strong> submitted by <strong>Durga Prasad</strong> (GitHub: <code>durga-prasad2006</code>) in partial fulfillment of the requirements for the completion of the <strong>MERN Stack Full-Stack Development Mini Project</strong>, inspired by <em>Smart India Hackathon (SIH 2025 – Healthcare & Medical Camp Management)</em>, is a bonafide record of authentic work carried out under our supervision and guidance during the academic session 2026.
            </p>

            <p style="font-size: 14px; line-height: 1.8; color: #334155; text-align: justify; margin-bottom: 35px;">
                The student has successfully developed, integrated, and deployed the full-stack architecture comprising a React-based interactive single-page application, an Express.js/Node.js REST API layer, and a cloud-hosted MongoDB Atlas database adhering strictly to a 3-collection relational structure, role-based access control, dynamic doctor assignment validation, and public cloud deployment on Vercel.
            </p>

            <table style="width: 100%; margin-top: 40px; border-collapse: collapse; text-align: center;">
                <tr>
                    <td style="width: 50%; padding-bottom: 45px;">
                        <div style="border-bottom: 1px dashed #94a3b8; width: 70%; margin: 0 auto 8px auto;"></div>
                        <span style="font-weight: 700; font-size: 13.5px; color: #0f172a;">Internal Project Guide / Mentor</span><br/>
                        <span style="font-size: 12px; color: #64748b;">Department of Computer Engineering</span>
                    </td>
                    <td style="width: 50%; padding-bottom: 45px;">
                        <div style="border-bottom: 1px dashed #94a3b8; width: 70%; margin: 0 auto 8px auto;"></div>
                        <span style="font-weight: 700; font-size: 13.5px; color: #0f172a;">Head of Department (HoD)</span><br/>
                        <span style="font-size: 12px; color: #64748b;">School of Computing & IT</span>
                    </td>
                </tr>
            </table>

            <div style="margin-top: 25px; padding: 18px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-transform: uppercase;">Candidate's Declaration</h4>
                <p style="font-size: 13px; line-height: 1.7; color: #475569; margin: 0; text-align: justify;">
                    I hereby declare that this project work entitled <strong>"Medical Camp Registration Portal"</strong> is an original work designed and implemented by me. All resources, libraries, specifications, and reference materials utilized during the course of development have been duly acknowledged.
                </p>
                <div style="text-align: right; margin-top: 15px; font-weight: 700; font-size: 13px; color: #0d9488;">
                    — Durga Prasad (durga-prasad2006)
                </div>
            </div>
        </div>
        """
    }
]

print("Base structure initialized.")
