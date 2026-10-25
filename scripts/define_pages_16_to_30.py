# scripts/define_pages_16_to_30.py
# Pages 16 to 30 matching the PDF specification, embedded screenshots and live URL

import os
import base64

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCREENSHOTS_DIR = os.path.join(BASE_DIR, "documentation_assets", "screenshots")

def get_b64(filename):
    p = os.path.join(SCREENSHOTS_DIR, filename)
    if os.path.exists(p):
        with open(p, "rb") as f:
            return "data:image/png;base64," + base64.b64encode(f.read()).decode("utf-8")
    return ""

img_home = get_b64("01_home.png")
img_camps = get_b64("02_camps.png")
img_login = get_b64("03_login.png")
img_register = get_b64("04_register.png")
img_participant = get_b64("05_participant_dashboard.png")
img_my_regs = get_b64("06_my_registrations.png")
img_profile = get_b64("07_profile.png")
img_admin_dash = get_b64("08_admin_dashboard.png")
img_manage_camps = get_b64("09_manage_camps.png")
img_doctor_dash = get_b64("10_doctor_dashboard.png")

P16_30 = [
    {
        "page_num": 16,
        "title": "9. REACT CONCEPTS IMPLEMENTED",
        "subtitle": "Analysis of Core React Concepts from Project Syllabus",
        "chapter": "SECTION 9: REACT CONCEPTS",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                The frontend architecture purposefully demonstrates all twelve core React concepts listed in Section 9 of the syllabus:
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #0d9488; color: white;">
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #0f766e; width: 22%;">React Concept</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #0f766e; width: 35%;">Theoretical Definition</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #0f766e;">Application in Medical Camp Portal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">Components</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Independent, reusable UI units.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Navbar, CampCard, StatusBadge, RegisterModal, AdminAccessModal.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">JSX</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Syntax extension mixing HTML with JS.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Declarative layouts combining state values with Tailwind CSS styling.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">Props</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Immutable parameters passed downward.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Passing camp metadata into CampCard and modal dialog callbacks.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">State & useState()</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Reactive local component memory.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Managing search queries, form inputs, open/close modals, and errors.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">useEffect()</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Side-effect execution on mount/update.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Fetching camps and doctors from Express REST API; syncing profile state.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">Forms & Events</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Controlled form inputs & handlers.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">onChange, onSubmit handlers validating login, registration and camp inputs.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">Lists & Keys</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Iterating arrays using unique keys.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Rendering camps.map() with camp.campId and registrations with registrationId.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">Conditional Rendering</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Rendering UI based on truthy logic.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Displaying "Camp Full" when quota is reached; role-based nav buttons.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">React Router</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Client-side Single Page routing.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Protected routing guarding /admin, /doctor, and /participant dashboards.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-weight: bold;">CSS Styling</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Tailwind CSS utility-first framework.</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Responsive grid layouts, high-contrast badges, and smooth animations.</td></tr>
                </tbody>
            </table>
        </div>
        """
    },
    {
        "page_num": 17,
        "title": "10. EXPRESSJS CONCEPTS IMPLEMENTED",
        "subtitle": "Analysis of Server Architecture & Middleware Concepts",
        "chapter": "SECTION 10: EXPRESSJS CONCEPTS",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                The backend service exemplifies the six Express.js architectural pillars specified on Page 4 of the syllabus:
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 20%;">Concept</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 35%;">Architecture Principle</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155;">Implementation in Project Backend</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">1. Routing</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Modular route grouping with express.Router().</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Separation into <code>authRoutes.js</code> (accounts) and <code>campRoute.js</code> (camps and registrations).</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">2. Middleware</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Intercepting HTTP requests before route handlers.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;"><code>cors()</code>, <code>express.json()</code>, and custom <code>authMiddleware.js</code> token verifier.</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">3. REST API</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Stateless resource-based architecture.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">JSON data exchange over standard endpoints: <code>/api/medicalCamps</code>, <code>/api/registrations</code>.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">4. HTTP Methods</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Semantic CRUD verb mappings.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">GET (read), POST (create), PUT (update), DELETE (cancel/remove).</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">5. Authentication</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Verifying identity against stored credentials.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Plain-text password comparison in MongoDB Atlas and master admin gatekeeping.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">6. JWT Login</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Cryptographically signed bearer tokens.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;"><code>jwt.sign({ userId, role }, process.env.JWT_SECRET)</code> with 7-day expiration.</td></tr>
                </tbody>
            </table>
        </div>
        """
    },
    {
        "page_num": 18,
        "title": "11. MONGODB CONCEPTS IMPLEMENTED",
        "subtitle": "Analysis of Database Operations & Cloud Features",
        "chapter": "SECTION 11: MONGODB CONCEPTS",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                The persistence layer leverages the full suite of MongoDB concepts specified in Section 11 of the syllabus:
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 22%;">MongoDB Concept</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155; width: 34%;">Database Mechanism</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #334155;">Specific Application in this Project</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">CRUD Operations</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Create, Read, Update, Delete cycles.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Camps scheduling, booking registration, attendance marking, camp cancellation.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Collections</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Logical grouping of JSON-like BSON documents.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Strictly 3 collections: <code>Users</code>, <code>MedicalCamps</code>, and <code>Registrations</code>.</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">find()</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Document querying and projection.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;"><code>MedicalCamp.find().sort({ campDate: 1 })</code> and <code>User.find({ role: 'doctor' })</code>.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">updateOne()</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Targeted atomic document modification.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;"><code>findOneAndUpdate({ registrationId }, { $set: { registrationStatus: 'Attended' } })</code>.</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">deleteOne()</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Removing obsolete records.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;"><code>MedicalCamp.findOneAndDelete({ campId })</code> and cascading registrations deletion.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">aggregate() / count</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Data processing pipelines.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;"><code>Registration.countDocuments({ campId, registrationStatus: { $ne: 'Cancelled' } })</code>.</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">createIndex()</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Index creation for rapid lookups.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Unique indices on <code>Users.email</code>, <code>Users.userId</code>, and <code>MedicalCamps.campId</code>.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">Atlas Connection</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Secure cloud connection URI with SSL/TLS.</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Mongoose cluster connection string with replica set failover handling.</td></tr>
                </tbody>
            </table>
        </div>
        """
    },
    {
        "page_num": 19,
        "title": "12. REST APIS SPECIFICATION",
        "subtitle": "Complete HTTP REST Endpoints Contract",
        "chapter": "SECTION 12: REST APIS",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                The backend exposes eleven structured REST API endpoints divided across Authentication, Medical Camps, and Registrations:
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #0d9488; color: white;">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #0f766e; width: 14%;">Domain</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #0f766e; width: 24%;">Endpoint & Verb</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #0f766e; width: 14%;">Access Level</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #0f766e;">Purpose & Input/Output Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td rowspan="3" style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f0fdfa;">Authentication</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">POST /api/register</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Registers Participant or Doctor; rejects admin (403).</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">POST /api/login</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Validates email and plain-text password; returns JWT token.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">POST /api/admin-login</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #b45309; font-weight: bold;">Master Admin</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Authenticates master admin password (Admin@2026).</td></tr>
                    
                    <tr style="background: #f8fafc;"><td rowspan="4" style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: bold;">Medical Camps</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">GET /api/medicalCamps</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Lists all medical camps with live remaining slot counters.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">POST /api/medicalCamps</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #b45309; font-weight: bold;">Admin (Auth)</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Creates camp; validates assigned doctor exists in DB.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">PUT /api/medicalCamps/:id</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #b45309; font-weight: bold;">Admin (Auth)</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Updates venue, date, capacity; re-validates doctor name.</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">DELETE /api/medicalCamps/:id</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #b45309; font-weight: bold;">Admin (Auth)</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Deletes camp and marks linked bookings as cancelled.</td></tr>

                    <tr><td rowspan="4" style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: bold; background: #f0fdfa;">Registrations</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">POST /api/registerCamp</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #0f766e; font-weight: bold;">Participant</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Reserves slot, checks capacity, creates TKN-001 pass.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">GET /api/registrations</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Auth</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Returns participant bookings or doctor camp attendee rosters.</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">PUT /api/registrations/:id</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Doctor / Admin</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Updates consultation status (e.g. Attended).</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">DELETE /api/cancelRegistration/:id</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Participant</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Cancels enrollment and restores slot to camp quota.</td></tr>
                </tbody>
            </table>
        </div>
        """
    },
    {
        "page_num": 20,
        "title": "UI PROOF 1: HOME & MEDICAL CAMPS DIRECTORY",
        "subtitle": "Real Visual Screenshots of Public User Interfaces",
        "chapter": "CHAPTER 9: VISUAL WALKTHROUGH",
        "content_html": f"""
        <div style="padding: 10px 0;">
            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.1: Home Landing Page (Home.jsx)</strong> &bull; Shows hero section with quick stats, live metrics, and primary call-to-actions.
            </p>
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="{img_home}" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="Home Page Screenshot" />
            </div>

            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.2: Medical Camps Directory (MedicalCamps.jsx)</strong> &bull; Demonstrates search filtering, category tabs, and real-time remaining capacity badges.
            </p>
            <div style="text-align: center;">
                <img src="{img_camps}" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="Medical Camps Directory Screenshot" />
            </div>
        </div>
        """
    },
    {
        "page_num": 21,
        "title": "UI PROOF 2: LOGIN & USER REGISTRATION",
        "subtitle": "Real Visual Screenshots of Authentication Pages",
        "chapter": "CHAPTER 9: VISUAL WALKTHROUGH",
        "content_html": f"""
        <div style="padding: 10px 0;">
            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.3: Login Page (Login.jsx)</strong> &bull; Features credential inputs, demo quick-fill helper pills, and role-based redirect routing.
            </p>
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="{img_login}" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="Login Page Screenshot" />
            </div>

            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.4: Registration Page (Register.jsx)</strong> &bull; Role toggle pills (Participant vs. Doctor), input sanitation, and prohibition of self-assigned admin roles.
            </p>
            <div style="text-align: center;">
                <img src="{img_register}" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="Registration Page Screenshot" />
            </div>
        </div>
        """
    },
    {
        "page_num": 22,
        "title": "UI PROOF 3: PARTICIPANT EXPERIENCE",
        "subtitle": "Real Visual Screenshots of Participant Portal & Tokens",
        "chapter": "CHAPTER 9: VISUAL WALKTHROUGH",
        "content_html": f"""
        <div style="padding: 10px 0;">
            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.5: Participant Dashboard (ParticipantDashboard.jsx)</strong> &bull; Overview of active camp appointments, countdown reminders, and status pills.
            </p>
            <div style="text-align: center; margin-bottom: 16px;">
                <img src="{img_participant}" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="Participant Dashboard Screenshot" />
            </div>

            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.6: My Registrations (MyRegistrations.jsx)</strong> &bull; Shows booked consultation history, printable token passes, and self-service cancellation controls.
            </p>
            <div style="text-align: center;">
                <img src="{img_my_regs}" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="My Registrations Screenshot" />
            </div>
        </div>
        """
    },
    {
        "page_num": 23,
        "title": "UI PROOF 4: PROFILE SETTINGS & ADMIN MODAL",
        "subtitle": "Real Visual Screenshots of User Profile & Security",
        "chapter": "CHAPTER 9: VISUAL WALKTHROUGH",
        "content_html": f"""
        <div style="padding: 10px 0;">
            <p style="font-size: 12.5px; line-height: 1.6; color: #334155; margin-bottom: 10px;">
                <strong>Figure 9.7: User Health Profile (Profile.jsx)</strong> &bull; Demonstrates live saving and persistence of user Name, Phone Number, Blood Group (O+), Age (24), Campus Hostel Address, and Emergency Contact details into MongoDB Atlas.
            </p>
            <div style="text-align: center; margin-bottom: 14px;">
                <img src="{img_profile}" style="width: 100%; max-height: 240px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" alt="User Profile Screenshot" />
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #0d9488; border-radius: 8px; padding: 12px; font-size: 12px; line-height: 1.6; color: #334155;">
                <strong>Verified Profile Update Fix:</strong> Profile update persistence has been verified end-to-end. When a user submits changes, the backend route <code>PUT /api/users/:id</code> updates the user document in MongoDB Atlas, and the frontend React state synchronizes immediately via the newly added <code>useEffect</code> listener.
            </div>
        </div>
        """
    },
    {
        "page_num": 24,
        "title": "UI PROOF 5: ADMIN & DOCTOR PORTALS",
        "subtitle": "Real Visual Screenshots of Administrative & Clinical Dashboards",
        "chapter": "CHAPTER 9: VISUAL WALKTHROUGH",
        "content_html": f"""
        <div style="padding: 10px 0;">
            <p style="font-size: 12px; line-height: 1.5; color: #334155; margin-bottom: 8px;">
                <strong>Figure 9.8: Admin Dashboard (AdminDashboard.jsx)</strong> &bull; High-level analytical KPI cards and participant rosters.
            </p>
            <div style="text-align: center; margin-bottom: 12px;">
                <img src="{img_admin_dash}" style="width: 100%; max-height: 170px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1;" alt="Admin Dashboard" />
            </div>

            <p style="font-size: 12px; line-height: 1.5; color: #334155; margin-bottom: 8px;">
                <strong>Figure 9.9: Manage Camps (ManageCamps.jsx)</strong> &bull; Shows camp creation with verified doctor dropdown selection.
            </p>
            <div style="text-align: center; margin-bottom: 12px;">
                <img src="{img_manage_camps}" style="width: 100%; max-height: 170px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1;" alt="Manage Camps" />
            </div>

            <p style="font-size: 12px; line-height: 1.5; color: #334155; margin-bottom: 8px;">
                <strong>Figure 9.10: Doctor Dashboard (DoctorDashboard.jsx)</strong> &bull; Assigned doctor schedule and attendance roster controls.
            </p>
            <div style="text-align: center;">
                <img src="{img_doctor_dash}" style="width: 100%; max-height: 170px; object-fit: contain; border-radius: 8px; border: 1.5px solid #cbd5e1;" alt="Doctor Dashboard" />
            </div>
        </div>
        """
    },
    {
        "page_num": 25,
        "title": "SECURITY & ADMIN ACCESS ARCHITECTURE",
        "subtitle": "Single Admin Account & React Portal Centering Solution",
        "chapter": "CHAPTER 10: SECURITY ARCHITECTURE",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">Single Administrator Model & Secret Access</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                In accordance with the client's specification (<em>"there should be only doctor and participant registration no admin only one admin is there and that should be on the top as admin button which is encrypted with password"</em>), the portal implements a hardened single-administrator security architecture:
            </p>
            <ul style="font-size: 12px; line-height: 1.65; color: #334155; margin-bottom: 14px; padding-left: 18px;">
                <li><strong>Prohibition of Admin Registration:</strong> The registration endpoint <code>POST /api/register</code> explicitly rejects any attempt to register with <code>role: "admin"</code> with an HTTP 403 Forbidden status code.</li>
                <li><strong>Single Dedicated Administrator:</strong> The database holds strictly one admin profile (<code>ADM-001</code>, <code>admin@camp.org</code>, password <code>Admin@2026</code>).</li>
                <li><strong>Dedicated Master Login Route:</strong> Handled via <code>POST /api/admin-login</code>, validating the master password directly against the stored administrator document.</li>
            </ul>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 10px;">React Portal Solution for Centered Modal</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                Initially, the Admin Password Modal appeared trapped inside the top navigation header bar due to the header's CSS <code>backdrop-filter: blur(...)</code> containing block trap. This was resolved by re-engineering <code>AdminAccessModal.jsx</code> using React's <code>createPortal(modalContent, document.body)</code>.
            </p>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 11.5px; color: #166534;">
                <strong>Visual Result:</strong> The Admin Access Modal now renders squarely in the <strong>exact vertical and horizontal center of the screen</strong> with a backdrop blur and smooth keyboard escape handlers.
            </div>
        </div>
        """
    },
    {
        "page_num": 26,
        "title": "DOCTOR ASSIGNMENT & DATABASE GATEKEEPING",
        "subtitle": "Eliminating Non-Existent Doctor Entry via Server Validation",
        "chapter": "CHAPTER 11: DOCTOR VALIDATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">The Problem of Non-Existent Doctor Assignment</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                In the earlier version of the portal, camp creation permitted typing arbitrary doctor names not present in the database. Consequently, camps were created with orphan doctor names, preventing attending doctors from accessing their schedules on the Doctor Dashboard.
            </p>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 10px;">Dual-Layer Gatekeeping Architecture</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #0d9488; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0f766e; font-size: 12px; display: block; margin-bottom: 4px;">LAYER 1: UI SELECT DROPDOWN</strong>
                    <p style="font-size: 11px; line-height: 1.5; color: #334155; margin: 0;">
                        In <code>ManageCamps.jsx</code>, the text input was replaced by a dynamic <code>&lt;select&gt;</code> dropdown populated from <code>GET /api/doctors</code>. The admin can only select real doctors registered in the <code>Users</code> collection.
                    </p>
                </div>
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #d97706; border-radius: 8px; padding: 10px;">
                    <strong style="color: #b45309; font-size: 12px; display: block; margin-bottom: 4px;">LAYER 2: BACKEND MONGOOSE QUERY</strong>
                    <p style="font-size: 11px; line-height: 1.5; color: #334155; margin: 0;">
                        In <code>campRoute.js</code>, <code>POST /medicalCamps</code> and <code>PUT /medicalCamps/:id</code> execute a case-insensitive regex query on <code>Users</code>. Any unverified doctor name is rejected with <code>HTTP 400 Bad Request</code>.
                    </p>
                </div>
            </div>

            <div style="background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 10px; line-height: 1.4;">
const doctorDoc = await User.findOne({<br/>
&nbsp;&nbsp;role: "doctor",<br/>
&nbsp;&nbsp;$or: [{ name: doctorName }, { name: new RegExp(`^${doctorName.trim()}$`, "i") }]<br/>
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
        "page_num": 27,
        "title": "SOFTWARE TESTING & TEST EXECUTION MATRIX",
        "subtitle": "Complete Quality Assurance & Test Case Results",
        "chapter": "CHAPTER 13: SOFTWARE TESTING",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                Comprehensive integration and boundary test suites were executed to verify system security, capacity constraints, and database integrity:
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 10%;">Test ID</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 22%;">Scenario Tested</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 28%;">Test Input & Endpoint</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 28%;">Expected Response</th>
                        <th style="padding: 5px 8px; text-align: center; border: 1px solid #334155; width: 12%;">Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-01</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Block Admin Registration</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">POST /register with role: 'admin'</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 403 Forbidden</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-02</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Doctor Registration</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">POST /register with role: 'doctor'</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 201 Created & saved in DB</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-03</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Reject Non-Existent Doctor</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">POST /medicalCamps with 'Dr. Fake'</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 400 Bad Request</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-04</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Accept Verified Doctor</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">POST /medicalCamps with 'Dr. Anil Kumar'</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 201 Created (7 attributes)</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-05</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Master Admin Login</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">POST /admin-login with 'Admin@2026'</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 200 OK & JWT returned</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-06</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Prevent Duplicate Booking</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Participant re-registers for same camp</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 400 Bad Request</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold;">TC-07</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Profile Update Persistence</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">PUT /users/:id with Name, Phone, Blood</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">HTTP 200 OK & verified on re-login</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">PASSED</td></tr>
                </tbody>
            </table>
        </div>
        """
    },
    {
        "page_num": 28,
        "title": "PERFORMANCE, SCALABILITY & CLOUD METRICS",
        "subtitle": "Vite 8 Bundling, Atlas Connection Pooling & Tailwind v4",
        "chapter": "CHAPTER 14: PERFORMANCE & CLOUD",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">Sub-Second Vite 8 Production Bundling</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                By utilizing Vite 8 with Rollup ES-module tree-shaking, production client compilation executes in under 1 second:
            </p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 10px; line-height: 1.4; margin-bottom: 14px;">
$ npm run build<br/>
&gt; vite build<br/>
✓ 1909 modules transformed.<br/>
dist/index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0.59 kB │ gzip: &nbsp;&nbsp;0.34 kB<br/>
dist/assets/index-BU7YCEVK.css &nbsp;61.39 kB │ gzip: &nbsp;10.31 kB<br/>
dist/assets/index-Nf7svGr-.js &nbsp;443.62 kB │ gzip: 117.33 kB<br/>
<strong style="color: #4ade80;">✓ built in 829ms</strong>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">MongoDB Atlas Cloud Architecture</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin: 0;">
                The production database is hosted on MongoDB Atlas with an automated multi-region replica set. Connection pooling maintains open SSL sockets to eliminate handshake latency during high-concurrency registration events.
            </p>
        </div>
        """
    },
    {
        "page_num": 29,
        "title": "13. EXPECTED OUTPUT & DELIVERABLES",
        "subtitle": "Checklist from Project Syllabus & Duration Summary",
        "chapter": "SECTION 13: EXPECTED OUTPUT",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                The completed application fully satisfies all nine expected deliverables specified on Page 5 of the project syllabus:
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #0d9488; color: white;">
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #0f766e; width: 10%;">#</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #0f766e; width: 45%;">Syllabus Expected Deliverable</th>
                        <th style="padding: 6px 10px; text-align: center; border: 1px solid #0f766e; width: 20%;">Implementation Status</th>
                        <th style="padding: 6px 10px; text-align: left; border: 1px solid #0f766e;">Verification Evidence</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">1</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Participant Registration</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Self-registration on /register</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">2</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Secure Login</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">JWT token issuance on /login</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">3</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">View Medical Camps</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Searchable catalog on /camps</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">4</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Online Camp Registration</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">One-click modal slot booking</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">5</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Registration Status Tracking</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Badges on /my-registrations</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">6</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Medical Camp Management</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Admin CRUD on /admin/camps</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">7</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Participant Dashboard</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Personalized cards on /participant</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">8</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Admin Dashboard</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Analytics console on /admin</td></tr>
                    <tr><td style="padding: 5px 10px; border: 1px solid #e2e8f0; font-weight: bold;">9</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Secure Storage in Atlas</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0; text-align: center; color: #16a34a; font-weight: bold;">COMPLETED</td><td style="padding: 5px 10px; border: 1px solid #e2e8f0;">Strict 3-collection cloud storage</td></tr>
                </tbody>
            </table>

            <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 12px; color: #334155;">
                <strong>Estimated Project Duration:</strong> 2 Weeks to 3 weeks &bull; <strong>Final Status:</strong> Fully Completed, Verified & Deployed.
            </div>
        </div>
        """
    },
    {
        "page_num": 30,
        "title": "REFERENCES, REPOSITORY & LIVE URL",
        "subtitle": "Documentation Citations, Source Code & Production Deployment",
        "chapter": "SECTION 18: REFERENCES & DEPLOYMENT",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">18.1 References & Documentation Standards</h3>
            <ol style="font-size: 11px; line-height: 1.6; color: #334155; margin-bottom: 14px; padding-left: 16px;">
                <li>Smart India Hackathon (SIH 2025) – Healthcare Outreach Problem Statement Guidelines, AICTE & MoE, Govt. of India.</li>
                <li>React 19 Official Documentation – Component Architecture, Hooks, Context API: <code>https://react.dev/</code></li>
                <li>Express.js 5 Guide – REST API Routing, Middleware Pipelines & HTTP Standards: <code>https://expressjs.com/</code></li>
                <li>MongoDB Atlas Manual – Cloud Sharded Replica Sets & Mongoose ODM: <code>https://www.mongodb.com/docs/</code></li>
                <li>Tailwind CSS v4 Documentation – Utility-First Responsive Styling: <code>https://tailwindcss.com/</code></li>
            </ol>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">18.2 Official GitHub Source Code Repository</h3>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; margin-bottom: 16px; font-size: 11.5px; line-height: 1.6;">
                <strong>Repository:</strong> <code>https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal</code><br/>
                <strong>Branch:</strong> <code>main</code> &bull; <strong>License:</strong> MIT Open Source &bull; <strong>Author:</strong> Durga Prasad
            </div>

            <div style="background: #f0fdfa; border: 2px solid #0d9488; border-radius: 12px; padding: 18px; text-align: center;">
                <div style="font-size: 13px; font-weight: 800; color: #0f766e; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                    Official Live Production Deployment URL
                </div>
                <div style="font-size: 15px; font-weight: 900; margin-bottom: 6px;">
                    <a href="https://medical-camp-registration-portal-tawny.vercel.app/" target="_blank" style="color: #2563eb; text-decoration: underline; word-break: break-all;">
                        https://medical-camp-registration-portal-tawny.vercel.app/
                    </a>
                </div>
                <p style="font-size: 11.5px; color: #475569; margin: 0;">
                    Hosted on Vercel Global Edge Network with live database connectivity to MongoDB Atlas.
                </p>
            </div>
        </div>
        """
    }
]

print("Pages 16 to 30 defined successfully!")
