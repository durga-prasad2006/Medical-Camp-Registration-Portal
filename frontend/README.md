# Medical Camp Registration Portal (Frontend)
> **Inspired by Smart India Hackathon (SIH 2025) – Healthcare & Medical Camp Management**

A modern, responsive, role-based web application built with **ReactJS**, **Tailwind CSS**, and **React Router** for managing campus-wide free medical camps (Eye check-ups, Blood donation drives, Dental screenings, General Health vitals, and Cardiology risk assessments).

---

## 🌟 Key Highlights

- **Multi-Role Portals**: Dedicated, secured workflows for **Participants**, **Administrators**, and **Doctors**.
- **Instant Demo Switcher**: One-click login dropdown on the Navbar and Login page to switch between Admin, Doctor, and Participant roles without typing credentials.
- **Immediate Interactivity**: Fully functional out of the box with a local storage-backed REST service layer (`src/services/api.js`). Any camp created, registration made, or attendance marked persists in the browser.
- **Backend Plug-and-Play**: Built to match standard Express & MongoDB REST endpoints. Once your backend is ready, just set `USE_BACKEND = true` in `src/services/api.js`!
- **Digital Passes**: Generates printable/downloadable entry tokens with simulated barcodes/QR codes for smooth on-campus queues.
- **Reports & Export**: Administrators can audit participant rosters, filter by camp or status, and export accreditation records to CSV or print PDF summaries.

---

## 🔑 Pre-Configured Demo Accounts

| Role | Email | Password | Access / Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@camp.org` | `admin` | Create/edit/delete camps, view participant registrations, export CSV & PDF reports, monitor camp capacity |
| **Doctor** | `dr.sharma@health.org` | `doctor` | View assigned camp patient rosters, mark attendance (Present/Absent), record clinical vitals & consultation notes |
| **Participant** | `rahul@gmail.com` | `user` | Browse medical camps, book slots, get digital passes, track status, cancel bookings, update health profile |

*(Or click the **"Demo Switcher"** button in the Navbar or Login page to log in immediately with 1 click)*

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── CampCard.jsx               # Camp card with live slot indicator & actions
│   ├── CampDetailsModal.jsx       # Detailed camp view modal
│   ├── Footer.jsx                 # Healthcare footer & demo database reset button
│   ├── Navbar.jsx                 # Responsive header with role switcher
│   ├── ProtectedRoute.jsx         # Role-based route guard
│   ├── RegisterModal.jsx          # Camp slot booking modal with medical notes
│   ├── RegistrationSlipModal.jsx  # Printable digital token pass modal
│   └── StatusBadge.jsx            # Consistent status pill styling
├── context/
│   └── AuthContext.jsx            # Global user authentication & role management
├── pages/
│   ├── AdminDashboard.jsx         # Overview KPIs, camp capacity, recent activity
│   ├── AdminRegistrations.jsx     # Master participant table, CSV export, PDF print
│   ├── DoctorDashboard.jsx        # Patient roster, attendance toggle, vitals record
│   ├── Home.jsx                   # Hero, stats, camp highlights, how-it-works, SIH comparison
│   ├── Login.jsx                  # Email login + 1-click demo role switcher
│   ├── ManageCamps.jsx            # Full CRUD (Add, Edit, Delete) for medical camps
│   ├── MedicalCamps.jsx           # Public camp directory with search & category filters
│   ├── MyRegistrations.jsx        # Participant's enrolled camps, status, digital pass
│   ├── ParticipantDashboard.jsx   # Participant greeting, active bookings, recommendations
│   ├── Profile.jsx                # Health profile, blood group, emergency contact
│   └── Register.jsx               # Participant signup with role choice
├── services/
│   ├── api.js                     # Mock/REST API service layer (localStorage adapter)
│   └── mockData.js                # Initial seed data for MongoDB collections
├── App.jsx                        # React Router v6 setup with all 11+ routes
├── index.css                      # Tailwind CSS v4 styling & custom scrollbars
└── main.jsx                       # Application entrypoint
```

---

## 🚀 How to Run the Frontend

1. **Install Dependencies** (already installed in this project):
   ```bash
   npm install
   ```

2. **Start Vite Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔌 Connecting to Your Express Backend Later

When you build your Express & MongoDB backend:

1. Open `src/services/api.js`.
2. Update the two configuration constants at the top:
   ```javascript
   export const USE_BACKEND = true;
   export const API_BASE_URL = 'http://localhost:5000/api';
   ```
3. Ensure your Express server implements the following REST endpoints:

### Authentication
- `POST /api/register` – Register new user
- `POST /api/login` – Login user

### Medical Camps
- `GET /api/medicalCamps` – Get list of all camps
- `POST /api/medicalCamps` – Create new camp (Admin)
- `PUT /api/medicalCamps/:id` – Update camp details (Admin)
- `DELETE /api/medicalCamps/:id` – Delete camp (Admin)

### Registrations
- `POST /api/registerCamp` – Participant registers for a camp
- `GET /api/registrations` – Get all registrations (filterable by `campId`, `participantId`)
- `PUT /api/registrations/:id` – Update status / attendance / doctor consultation
- `DELETE /api/cancelRegistration/:id` – Cancel a registration and release slot

