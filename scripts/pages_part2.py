# scripts/pages_part2.py
# Pages 11 to 20 for the Medical Camp Registration Portal Documentation

PAGES_PART2 = [
    {
        "page_num": 11,
        "title": "CHAPTER 5: SYSTEM MODULES (MODULES 1 TO 3)",
        "subtitle": "Participant Registration, Authentication & Camp Management",
        "chapter": "CHAPTER 5: SYSTEM MODULES",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                The functional requirements specified in the project problem statement are systematically decomposed into seven dedicated functional modules. Modules 1 through 3 govern identity establishment and administrative event scheduling.
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0d9488; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #0f766e; margin: 0 0 6px 0;">MODULE 1: PARTICIPANT & DOCTOR REGISTRATION</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    Enables new users to self-register into the system. Features client-side validation for mandatory fields (Name, Email, Password) and role selection toggle between <strong>Participant</strong> and <strong>Doctor</strong>.
                </p>
                <div style="background: #ffffff; padding: 8px; border-radius: 6px; font-size: 11.5px; color: #475569; border: 1px solid #cbd5e1;">
                    <strong>Security Enforcement:</strong> Any attempt to register with <code>role: "admin"</code> via the registration form or raw API request is intercepted by <code>authRoutes.js</code> and rejected with <code>HTTP 403 Forbidden</code>: <em>"Admin registration is prohibited. Only Participant and Doctor registrations are supported."</em>
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #1d4ed8; margin: 0 0 6px 0;">MODULE 2: LOGIN AUTHENTICATION & SESSION MANAGEMENT</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    Facilitates role-aware login for registered participants and medical doctors. Validates email and unencrypted plain-text password against MongoDB Atlas. On successful authentication, issues a JSON Web Token (JWT) and sets the global <code>useAuth</code> session.
                </p>
                <div style="background: #ffffff; padding: 8px; border-radius: 6px; font-size: 11.5px; color: #475569; border: 1px solid #cbd5e1;">
                    <strong>Master Admin Channel:</strong> Separate dedicated authentication endpoint (<code>POST /api/admin-login</code>) verifying the master password (<code>"Admin@2026"</code>) exclusively for the single administrator (<code>ADM-001</code>).
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 12px; margin-bottom: 0;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #b45309; margin: 0 0 6px 0;">MODULE 3: MEDICAL CAMP MANAGEMENT (ADMIN CRUD)</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    Provides administrative command over medical camp operations. Admins can schedule new camps, update timings and venues, adjust maximum participant limits, and cancel obsolete events.
                </p>
                <div style="background: #ffffff; padding: 8px; border-radius: 6px; font-size: 11.5px; color: #475569; border: 1px solid #cbd5e1;">
                    <strong>Doctor Verification Gate:</strong> Camp creation requires assigning an attending physician. The UI dynamically loads registered doctors from <code>GET /api/doctors</code>, while the server validates that the doctor exists in the <code>Users</code> collection with <code>role: "doctor"</code> before saving.
                </div>
            </div>
        </div>
        """
    },
    {
        "page_num": 12,
        "title": "CHAPTER 5: SYSTEM MODULES (MODULES 4 TO 7)",
        "subtitle": "Camp Registration, Tracking & Role-Based Dashboards",
        "chapter": "CHAPTER 5: SYSTEM MODULES",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                Modules 4 through 7 govern user interactions, status lifecycles, and analytical dashboard reporting.
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #10b981; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #047857; margin: 0 0 6px 0;">MODULE 4: CAMP REGISTRATION & SLOT ALLOCATION</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    Empowers authenticated participants to browse scheduled camps with live capacity indicators. Participants can click "Register Now" to trigger a confirmation modal.
                </p>
                <div style="background: #ffffff; padding: 8px; border-radius: 6px; font-size: 11.5px; color: #475569; border: 1px solid #cbd5e1;">
                    <strong>Concurrency & Overbooking Prevention:</strong> Computes available slots dynamically (<code>maximumParticipants - activeRegistrations</code>). Prevents duplicate enrollment by verifying <code>participantId</code> and <code>campId</code> uniqueness before persisting the record.
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #8b5cf6; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #6d28d9; margin: 0 0 6px 0;">MODULE 5: REGISTRATION STATUS & DIGITAL TOKEN PASS</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    Tracks the state of each booking across three formal statuses: <code>"Registered"</code>, <code>"Attended"</code>, and <code>"Cancelled"</code>. Generates printable digital tokens (<code>TKN-001</code>) with consultation instructions.
                </p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #06b6d4; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #0e7490; margin: 0 0 6px 0;">MODULE 6: PARTICIPANT DASHBOARD & HISTORY</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    A personalized portal for participants displaying active health camp enrollments, historical consultation slips, camp date reminders, and quick cancellation controls.
                </p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; border-radius: 8px; padding: 12px; margin-bottom: 0;">
                <h4 style="font-size: 13.5px; font-weight: 800; color: #334155; margin: 0 0 6px 0;">MODULE 7: ADMIN & DOCTOR DASHBOARDS</h4>
                <p style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">
                    <strong>Admin Dashboard:</strong> Real-time analytical widgets showing Total Camps Organized, Active Registrations, Verified Doctors, and Capacity Utilization.<br/>
                    <strong>Doctor Dashboard:</strong> Filtered schedule view displaying only camps where the logged-in doctor is the designated attending physician, with one-click attendance marking.
                </p>
            </div>
        </div>
        """
    },
    {
        "page_num": 13,
        "title": "CHAPTER 6: WORKING PRINCIPLE & SYSTEM WORKFLOW",
        "subtitle": "End-to-End Operational Lifecycle & Sequence",
        "chapter": "CHAPTER 6: WORKING PRINCIPLE",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                The operational flow follows a coordinated nine-step sequence connecting the administrator, participant, doctor, and MongoDB Atlas database:
            </p>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
                <div style="font-size: 12.5px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 10px;">Step-by-Step Execution Lifecycle:</div>
                <ol style="font-size: 12px; line-height: 1.75; color: #334155; margin: 0; padding-left: 18px;">
                    <li><strong>Admin Portal Unlock:</strong> Admin clicks the top-level "Admin" button on the navigation bar. Enters the master password <code>"Admin@2026"</code> in the centered security access modal.</li>
                    <li><strong>Doctor Roster Seeding:</strong> Specialist doctors register through the portal (<code>role: "doctor"</code>), creating verified user profiles in the <code>Users</code> collection.</li>
                    <li><strong>Medical Camp Creation:</strong> Admin schedules a new camp by selecting camp type, venue, date, capacity quota, and an assigned doctor from the database-driven doctor dropdown.</li>
                    <li><strong>Database Validation & Persistence:</strong> Express validates that the selected doctor exists in <code>Users</code>. On success, persists the 7-attribute camp document in <code>MedicalCamps</code>.</li>
                    <li><strong>Participant Onboarding:</strong> Participant signs up with basic profile info (<code>role: "participant"</code>) and logs into the application.</li>
                    <li><strong>Camp Discovery & Slot Booking:</strong> Participant browses upcoming camps, checks remaining capacity slots, and registers for their preferred camp.</li>
                    <li><strong>Atomic Registration:</strong> MongoDB Atlas saves the 5-attribute registration document (<code>registrationStatus: "Registered"</code>) and generates a digital token pass.</li>
                    <li><strong>Clinical Consultation & Attendance:</strong> On the day of the camp, the assigned doctor logs into their Doctor Dashboard, reviews the patient list, and marks attendance (<code>"Attended"</code>).</li>
                    <li><strong>Status Verification & Reporting:</strong> Participants track attendance status live, while the admin reviews aggregate attendance metrics and camp performance reports.</li>
                </ol>
            </div>

            <div style="background: #e0f2fe; border-left: 4px solid #0284c7; padding: 10px 14px; border-radius: 6px; font-size: 12px; color: #0369a1;">
                <strong>Architectural Guarantee:</strong> Every transaction maintains complete referential integrity between <code>Users.userId</code>, <code>MedicalCamps.campId</code>, and <code>Registrations.participantId</code>.
            </div>
        </div>
        """
    },
    {
        "page_num": 14,
        "title": "CHAPTER 7: REACT FRONTEND ARCHITECTURE",
        "subtitle": "Components, JSX, Virtual DOM & Routing (v7)",
        "chapter": "CHAPTER 7: FRONTEND IMPLEMENTATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                The client interface is engineered using <strong>React 19</strong> powered by the <strong>Vite 8</strong> next-generation build tool and styled with <strong>Tailwind CSS v4</strong>. The frontend leverages modern declarative programming principles.
            </p>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">Core React Concepts Implemented</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; line-height: 1.6; margin-bottom: 16px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">1. Modular Component Hierarchy</strong>
                    Deconstructs UI into reusable, decoupled components: <code>Navbar</code>, <code>Footer</code>, <code>CampCard</code>, <code>StatusBadge</code>, <code>AdminAccessModal</code>, and <code>RegistrationSlipModal</code>.
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">2. Declarative JSX & Virtual DOM</strong>
                    Combines HTML structure and JavaScript logic seamlessly. Reconciles state updates via React's Virtual DOM diffing engine for sub-millisecond screen repaints.
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">3. Unidirectional Props Data Flow</strong>
                    Parent page components pass camp metadata, status values, and callback triggers down to child card and modal elements with strict immutability.
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                    <strong style="color: #0d9488; display: block; margin-bottom: 4px;">4. Client-Side Routing (React Router v7)</strong>
                    Enables dynamic Single Page Application (SPA) navigation without browser page reloads. Includes public, protected, and role-authorized route guards.
                </div>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">Route Configuration Matrix (App.jsx)</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 22%;">Path</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 28%;">Page Component</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155; width: 20%;">Access Level</th>
                        <th style="padding: 5px 8px; text-align: left; border: 1px solid #334155;">Functional Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Home.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Hero banner, stats & upcoming camps</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/register</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Register.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Participant and Doctor registration</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/login</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Login.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Credential verification & JWT storage</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/camps</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">MedicalCamps.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Public / All</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Camp directory with search and filters</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/participant</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">ParticipantDashboard.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #0284c7; font-weight: bold;">Participant</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Bookings, tokens and health passes</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/admin</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">AdminDashboard.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #d97706; font-weight: bold;">Admin Only</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Camp statistics and attendee roster</td></tr>
                    <tr><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/admin/camps</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">ManageCamps.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #d97706; font-weight: bold;">Admin Only</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Full CRUD management of medical camps</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 4px 8px; border: 1px solid #e2e8f0; font-family: monospace;">/doctor</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">DoctorDashboard.jsx</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0; color: #7c3aed; font-weight: bold;">Doctor Only</td><td style="padding: 4px 8px; border: 1px solid #e2e8f0;">Assigned camp dates & attendance updates</td></tr>
                </tbody>
            </table>
        </div>
        """
    },
    {
        "page_num": 15,
        "title": "CHAPTER 7: ADVANCED HOOKS & REACT PORTALS",
        "subtitle": "State Management, Context API & Centered Modal Rendering",
        "chapter": "CHAPTER 7: FRONTEND IMPLEMENTATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">State Management Hooks</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                State in the frontend is managed deterministically through React's native hooks:
            </p>
            <ul style="font-size: 12px; line-height: 1.7; color: #334155; margin-bottom: 14px;">
                <li><code>useState()</code>: Tracks local form inputs (e.g. camp details, login credentials, filters, modal open/close states).</li>
                <li><code>useEffect()</code>: Orchestrates asynchronous data acquisition (e.g. loading camps from <code>api.getCamps()</code> and registered doctors from <code>api.getDoctors()</code> on component mount).</li>
                <li><code>useContext(AuthContext)</code>: Distributes global user identity, authentication status, and token headers throughout the component tree without prop-drilling.</li>
            </ul>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">React Portal Implementation (AdminAccessModal.jsx)</h3>
            <p style="font-size: 12.5px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                <strong>The Architectural Bug & Solution:</strong> The sticky navigation header (<code>&lt;header&gt;</code>) utilizes CSS backdrop-filter (<code>backdrop-blur-md</code>). Per official CSS specifications, any element possessing a <code>backdrop-filter</code> or <code>filter</code> becomes the containing block for all its <code>fixed</code> descendants. Consequently, rendering the Admin Modal directly inside <code>Navbar.jsx</code> trapped the modal within the 64-pixel header bar at the top of the screen.
            </p>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <div style="font-size: 11.5px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px;">Portal Solution Code (AdminAccessModal.jsx):</div>
                <div style="background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 10.5px; line-height: 1.5;">
import { createPortal } from 'react-dom';<br/><br/>
export const AdminAccessModal = ({ isOpen, onClose }) => {<br/>
&nbsp;&nbsp;if (!isOpen) return null;<br/>
&nbsp;&nbsp;const modalContent = (<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 my-auto"&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{/* Centered Admin Access Form */}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br/>
&nbsp;&nbsp;);<br/>
&nbsp;&nbsp;return createPortal(modalContent, document.body);<br/>
};
                </div>
            </div>

            <p style="font-size: 12px; line-height: 1.6; color: #475569; margin: 0;">
                By delegating modal rendering to <code>document.body</code> via <code>createPortal</code>, the modal completely breaks free from the navbar's containing block and renders squarely in the <strong>exact vertical and horizontal center of the viewport</strong>.
            </p>
        </div>
        """
    },
    {
        "page_num": 16,
        "title": "CHAPTER 8: EXPRESS.JS BACKEND IMPLEMENTATION",
        "subtitle": "Server Pipelines, Middleware, Routing & DB Seeding",
        "chapter": "CHAPTER 8: BACKEND IMPLEMENTATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                The backend service is powered by <strong>Express.js 5</strong> on <strong>Node.js v24</strong>. The server architecture prioritizes clean separation of concerns across configuration, middleware pipelines, domain routes, and cloud persistence.
            </p>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">Server Initialization Pipeline (server.js)</h3>
            <div style="background: #0f172a; color: #e2e8f0; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 10.5px; line-height: 1.5; margin-bottom: 16px;">
const express = require("express");<br/>
const path = require("path");<br/>
const cors = require("cors");<br/>
const dotenv = require("dotenv");<br/>
const connectDB = require("./config/db");<br/>
const seedDatabase = require("./config/seed");<br/><br/>
// Safe absolute path resolution for environment variables<br/>
dotenv.config({ path: path.join(__dirname, ".env") });<br/><br/>
const app = express();<br/>
app.use(cors());<br/>
app.use(express.json());<br/><br/>
// Modular REST routing<br/>
app.use("/api", require("./routes/authRoutes"));<br/>
app.use("/api", require("./routes/campRoute"));<br/><br/>
// Connect to MongoDB Atlas & trigger idempotent seeding<br/>
connectDB().then(async () => {<br/>
&nbsp;&nbsp;await seedDatabase();<br/>
});<br/><br/>
app.listen(process.env.PORT || 5000, () => {<br/>
&nbsp;&nbsp;console.log(`Server running on port ${process.env.PORT || 5000}`);<br/>
});
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">Key Middleware Components</h3>
            <ul style="font-size: 12px; line-height: 1.7; color: #334155; margin: 0; padding-left: 18px;">
                <li><strong>CORS (Cross-Origin Resource Sharing):</strong> Grants access to incoming HTTP requests originating from the Vercel-deployed frontend domain and local development ports.</li>
                <li><strong>JSON Body Parser:</strong> Parses incoming <code>application/json</code> payloads into native JavaScript request objects (<code>req.body</code>).</li>
                <li><strong>authMiddleware.js:</strong> Intercepts protected routes (e.g. camp creation, updates, and cancellations), verifies the JWT signature, and attaches authenticated user identity to <code>req.user</code>.</li>
            </ul>
        </div>
        """
    },
    {
        "page_num": 17,
        "title": "CHAPTER 8: REST APIS (AUTH & DOCTORS)",
        "subtitle": "Specifications for POST /register, /login, /admin-login & GET /doctors",
        "chapter": "CHAPTER 8: BACKEND IMPLEMENTATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">1. User Registration (POST /api/register)</h3>
            <p style="font-size: 12px; color: #334155; margin-bottom: 6px;">Creates a new Participant or Doctor profile in the <code>Users</code> collection.</p>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
                <strong>Request Payload:</strong> <code>{ "userId": "USR-101", "name": "Dr. Anil Kumar", "email": "anil@camp.org", "password": "pass", "role": "doctor" }</code><br/>
                <strong>Security Guard:</strong> If <code>role === "admin"</code>, server returns <code>HTTP 403 Forbidden</code>: <em>"Admin registration is prohibited. Only Participant and Doctor registrations are supported."</em><br/>
                <strong>Success Response (201 Created):</strong> <code>{ "message": "User registered successfully", "user": { ... } }</code>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">2. User Login (POST /api/login)</h3>
            <p style="font-size: 12px; color: #334155; margin-bottom: 6px;">Authenticates participants and doctors, returning a signed JWT token.</p>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
                <strong>Request Payload:</strong> <code>{ "email": "user@test.com", "password": "userpass" }</code><br/>
                <strong>Validation:</strong> Compares unencrypted password string directly against MongoDB Atlas <code>Users</code> record.<br/>
                <strong>Success Response (200 OK):</strong> <code>{ "token": "&lt;jwt_bearer_token&gt;", "user": { "userId": "USR-...", "name": "...", "role": "..." } }</code>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">3. Master Admin Login (POST /api/admin-login)</h3>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font-size: 11px; margin-bottom: 12px;">
                <strong>Request Payload:</strong> <code>{ "password": "Admin@2026" }</code><br/>
                <strong>Validation:</strong> Finds single admin user (<code>role: 'admin'</code>). If password matches <code>"Admin@2026"</code>, issues admin token; otherwise rejects with <code>401 Unauthorized</code>: <em>"Invalid Admin Password. Access Denied."</em>
            </div>

            <h3 style="font-size: 14px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 8px;">4. Fetch Registered Doctors (GET /api/doctors)</h3>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font-size: 11px; margin: 0;">
                <strong>Query:</strong> <code>User.find({ role: 'doctor' }).select('userId name email')</code><br/>
                <strong>Response (200 OK):</strong> Returns array of genuine registered doctors from MongoDB Atlas to populate the Admin camp creation dropdown.
            </div>
        </div>
        """
    },
    {
        "page_num": 18,
        "title": "CHAPTER 8: REST APIS (MEDICAL CAMPS CRUD)",
        "subtitle": "Specifications for GET, POST, PUT, DELETE /api/medicalCamps",
        "chapter": "CHAPTER 8: BACKEND IMPLEMENTATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                Medical camp management routes implement complete CRUD operations on the <code>MedicalCamps</code> collection, strictly adhering to the 7-attribute document schema.
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 14px;">
                <thead>
                    <tr style="background: #1e293b; color: white;">
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 15%;">Method & Route</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 12%;">Access</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155; width: 33%;">Payload / Parameters</th>
                        <th style="padding: 6px 8px; text-align: left; border: 1px solid #334155;">Functional Behavior & Validation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold; color: #0284c7;">GET /medicalCamps</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Public</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Optional query filters (type, status)</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Fetches all camps sorted chronologically. Enriches each camp with live registeredCount without altering DB.</td>
                    </tr>
                    <tr style="background: #f8fafc;">
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold; color: #16a34a;">POST /medicalCamps</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #d97706;">Admin (Auth)</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">JSON: campName, campType, campDate, venue, doctorName, maximumParticipants</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Validates that doctorName exists in Users with role: 'doctor'. Rejects invalid doctors with 400. Saves 7-attribute doc.</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold; color: #d97706;">PUT /medicalCamps/:id</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #d97706;">Admin (Auth)</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">URL param: campId; Body: updated attributes</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Updates camp venue, date, quota, or doctor. Re-validates doctorName if changed. Returns updated record.</td>
                    </tr>
                    <tr style="background: #f8fafc;">
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold; color: #dc2626;">DELETE /medicalCamps/:id</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #d97706;">Admin (Auth)</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">URL param: campId</td>
                        <td style="padding: 5px 8px; border: 1px solid #e2e8f0;">Deletes camp from MedicalCamps and cascades cancellation to all associated registrations.</td>
                    </tr>
                </tbody>
            </table>

            <h4 style="font-size: 12.5px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px;">Doctor Validation Code Implementation (campRoute.js)</h4>
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
        "page_num": 19,
        "title": "CHAPTER 8: REST APIS (REGISTRATIONS & ROSTER)",
        "subtitle": "Specifications for POST /registerCamp, GET, PUT & DELETE",
        "chapter": "CHAPTER 8: BACKEND IMPLEMENTATION",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 12px;">
                Registration endpoints manage participant bookings, capacity enforcement, and clinical attendance rosters.
            </p>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                <h4 style="font-size: 12.5px; font-weight: 800; color: #0284c7; margin: 0 0 4px 0;">1. POST /api/registerCamp (Participant Enrollment)</h4>
                <div style="font-size: 11px; line-height: 1.5; color: #334155;">
                    <strong>Execution Steps:</strong><br/>
                    a. Checks if <code>campId</code> exists in <code>MedicalCamps</code>.<br/>
                    b. Counts active bookings for this camp; verifies <code>registeredCount &lt; camp.maximumParticipants</code> (returns <code>400</code> if full).<br/>
                    c. Checks if participant is already registered for this camp (returns <code>400</code> if duplicate).<br/>
                    d. Generates unique <code>registrationId</code> (e.g. <code>REG-2026-XXXX</code>) and saves document with <code>registrationStatus: "Registered"</code>.<br/>
                    <strong>Response (201 Created):</strong> Returns registration object and generated token number.
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                <h4 style="font-size: 12.5px; font-weight: 800; color: #16a34a; margin: 0 0 4px 0;">2. GET /api/registrations (Fetch Attendance Rosters)</h4>
                <div style="font-size: 11px; line-height: 1.5; color: #334155;">
                    <strong>Query Filters:</strong> <code>participantId</code> (returns participant's personal registrations) or <code>campId</code> (returns attendee roster for a camp).<br/>
                    <strong>Data Enrichment:</strong> Joins with <code>MedicalCamps</code> and <code>Users</code> to attach camp title, venue, and participant name for clean UI rendering.
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
                <h4 style="font-size: 12.5px; font-weight: 800; color: #d97706; margin: 0 0 4px 0;">3. PUT /api/registrations/:id (Update Attendance Status)</h4>
                <div style="font-size: 11px; line-height: 1.5; color: #334155;">
                    <strong>Access:</strong> Admin or Attending Doctor.<br/>
                    <strong>Payload:</strong> <code>{ "registrationStatus": "Attended" }</code><br/>
                    <strong>Behavior:</strong> Marks participant as attended following on-site clinical consultation.
                </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; margin: 0;">
                <h4 style="font-size: 12.5px; font-weight: 800; color: #dc2626; margin: 0 0 4px 0;">4. DELETE /api/cancelRegistration/:id (Booking Cancellation)</h4>
                <div style="font-size: 11px; line-height: 1.5; color: #334155;">
                    <strong>Behavior:</strong> Sets <code>registrationStatus: "Cancelled"</code>, immediately relinquishing the reserved slot back to the camp's available capacity.
                </div>
            </div>
        </div>
        """
    },
    {
        "page_num": 20,
        "title": "CHAPTER 9: FRONTEND UI WALKTHROUGH (PAGES 1 - 4)",
        "subtitle": "Home, Register, Login & Participant Dashboard Walkthrough",
        "chapter": "CHAPTER 9: UI & APPLICATION WALKTHROUGH",
        "content_html": """
        <div style="padding: 10px 0;">
            <p style="font-size: 13px; line-height: 1.7; color: #334155; text-align: justify; margin-bottom: 14px;">
                The user interface is designed with a modern medical-grade aesthetic utilizing high-contrast teal, cyan, and amber palettes with intuitive responsive layouts.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 1: HOME PAGE (Home.jsx)</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 8px 0;">
                        Serves as the public landing page. Features a prominent hero banner, quick statistics counter, featured upcoming camps carousel, and quick navigation links.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Hero CTA: "Explore Medical Camps" & "Register Now"</li>
                        <li>Live metrics: Total Camps, Doctors On Duty</li>
                        <li>Responsive multi-device layout</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 2: REGISTER (Register.jsx)</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 8px 0;">
                        Clean registration form supporting two user types: Participant and Doctor.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Role toggle pills: Participant vs. Doctor</li>
                        <li>Prohibits Admin registration (returns 403 error)</li>
                        <li>Input validation for email formatting and password</li>
                        <li>Direct redirect to login upon completion</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 3: LOGIN (Login.jsx)</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 8px 0;">
                        Standard login portal for participants and doctors.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Credentials validation against plain-text DB records</li>
                        <li>One-click Demo Fill buttons for quick testing</li>
                        <li>Role-aware routing redirect to respective dashboard</li>
                        <li>Persistent JWT local storage handling</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0d9488; margin-bottom: 4px;">PAGE 4: PARTICIPANT DASHBOARD</div>
                    <p style="font-size: 11.5px; line-height: 1.6; color: #475569; margin: 0 0 8px 0;">
                        Private command center for registered participants.
                    </p>
                    <ul style="font-size: 11px; color: #334155; margin: 0; padding-left: 14px; line-height: 1.5;">
                        <li>Summary cards of active bookings & past checkups</li>
                        <li>Upcoming camp schedule timeline</li>
                        <li>Quick cancellation buttons</li>
                        <li>One-click access to download digital token slips</li>
                    </ul>
                </div>
            </div>
        </div>
        """
    }
]

print("Pages Part 2 (11 to 20) defined.")
