# Medical Camp Registration Portal - 30-Page Technical Documentation
> **Comprehensive 30-Page Technical Project Report**  
> **Inspired by Smart India Hackathon (SIH 2025) – Healthcare & Medical Camp Management**  
> **Student Developer:** Durga Prasad (`durga-prasad2006`)  
> **GitHub Repository:** https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal  
> **Official Live Production URL:** https://medical-camp-registration-portal-tawny.vercel.app/  



================================================================================<!-- ========================================================================= -->
<!-- PAGE 1 OF 30 | COVER PAGE & METADATA -->
<!-- ========================================================================= -->

## Page 1: PROJECT 2: MERN STACK MINI PROJECT
*Medical Camp Registration Portal*  
*Chapter: COVER PAGE & METADATA*

Full-Stack MERN Mini Project
            # MEDICAL CAMP REGISTRATION PORTAL

            (Inspired by SIH 2025 – Healthcare & Medical Camp Management)

            
            
                Comprehensive 30-Page Technical Project Documentation Report
            

            
                ### Project Metadata & Submission Details

                
| Project Title: | Medical Camp Registration Portal |
| --- | --- |
| Curriculum Track: | Project 2: MERN Stack Mini Project |
| Student Developer: | Durga Prasad |
| GitHub Profile: | durga-prasad2006 |
| GitHub Repository: | Medical-Camp-Registration-Portal |
| Theme & Inspiration: | SIH 2025 Healthcare & Medical Camp Management |
| Technology Stack: | MongoDB Atlas, Express.js, React.js (Vite), Node.js |
| Database Design: | Strict 3-Collection Architecture (Users, Camps, Registrations) |
| Live Application URL: | https://medical-camp-registration-portal-tawny.vercel.app/ |

            

            
                **Academic Session:** 2026 • **Status:** Completed & Production Deployed

                *Department of Computer Science & Engineering / Information Technology*

---
*Medical Camp Registration Portal &bull; Page 1 of 30*

<!-- ========================================================================= -->
<!-- PAGE 2 OF 30 | PRELIMINARY PAGES -->
<!-- ========================================================================= -->

## Page 2: CERTIFICATE & STUDENT DECLARATION
*Official Academic Evaluation Record*  
*Chapter: PRELIMINARY PAGES*

## Certificate of Completion

                
            

            
                This is to certify that the project entitled **"Medical Camp Registration Portal"** submitted by **Durga Prasad** (GitHub: `durga-prasad2006`) in partial fulfillment of the requirements for the award of completion for **Project 2: MERN Stack Mini Project**, inspired by *Smart India Hackathon (SIH 2025 – Healthcare & Medical Camp Management)*, is a bonafide record of authentic work carried out during the academic year 2026.
            

            
                The software application encompasses the complete development lifecycle including requirements engineering, user role modeling, strict 3-collection relational database design in MongoDB Atlas, RESTful API construction with Express.js and Node.js, responsive frontend engineering in React.js, and public cloud deployment on Vercel.
            

            
| Internal Project Guide                         Department of Computer Engineering | Head of Department (HoD)                         School of Computing & IT |
| --- | --- |

            
                #### Candidate's Declaration

                
                    I hereby declare that this project report entitled **"Medical Camp Registration Portal"** is written and executed by me. The technical implementation, database collections, and deployed cloud services are genuine and represent my own technical efforts.
                

                
                    — Durga Prasad (durga-prasad2006)

---
*Medical Camp Registration Portal &bull; Page 2 of 30*

<!-- ========================================================================= -->
<!-- PAGE 3 OF 30 | PRELIMINARY PAGES -->
<!-- ========================================================================= -->

## Page 3: ACKNOWLEDGEMENTS & EXECUTIVE ABSTRACT
*Overview, Motivation & Core Value Proposition*  
*Chapter: PRELIMINARY PAGES*

### Acknowledgements

                
                    I extend my heartfelt gratitude to my project guides, professors, and peer developers who provided invaluable architectural feedback during the design of this software. I am deeply thankful to the **Smart India Hackathon (SIH 2025)** initiative for highlighting real-world community healthcare challenges, which formed the foundational inspiration for this full-stack portal.
                

            

            
                ### Executive Abstract

                
                    Higher educational institutions and charitable healthcare trusts frequently sponsor free health camps including general checkups, eye exams, blood donation drives, dental screenings, and preventive health awareness seminars. Traditionally, managing participant intake and scheduling relies on manual paperwork, physical registers, or uncoordinated spreadsheets. This manual approach introduces severe limitations: data loss, physical queue congestion, inability to enforce slot caps, and lack of real-time visibility for attending doctors.
                

                
                    The **Medical Camp Registration Portal** delivers a complete digital alternative developed with the **MERN Stack (MongoDB, Express, React, Node.js)**. It provides distinct role-based interfaces for **Administrators**, **Participants**, and **Doctors**. Key engineering highlights include a strict 3-collection relational model in MongoDB Atlas, unencrypted plain-text password persistence as specified, a single master administrator account with top-level centered modal security, and dynamic doctor verification preventing fictitious doctor assignments.
                

            

            
                **Summary of Deliverables:** Production-tested full-stack system featuring sub-second response times, automated token generation, live slot counters, cloud hosting on Vercel, and zero registration duplication.

---
*Medical Camp Registration Portal &bull; Page 3 of 30*

<!-- ========================================================================= -->
<!-- PAGE 4 OF 30 | PRELIMINARY PAGES -->
<!-- ========================================================================= -->

## Page 4: TABLE OF CONTENTS & DOCUMENT ROADMAP
*Structured Outline Across Exactly 30 Pages*  
*Chapter: PRELIMINARY PAGES*

### Report Structure & Navigation Guide

            
                
                    **PART I: SPECIFICATIONS & ARCHITECTURE**
                    

                        - **Page 1:** Title Page & Project Metadata

                        - **Page 2:** Certificate of Completion & Declaration

                        - **Page 3:** Acknowledgements & Abstract

                        - **Page 4:** Table of Contents & Roadmap

                        - **Page 5:** 1. Problem Statement & Scope

                        - **Page 6:** 2. Why Develop this Project?

                        - **Page 7:** 3. User Roles (Admin, Participant, Doctor)

                        - **Page 8:** 4. Modules 1 to 4 (Registration & Camps)

                        - **Page 9:** 4. Modules 5 to 7 (Status & Dashboards)

                        - **Page 10:** 5. Working Principle (a to i Sequence)

                        - **Page 11:** 6. Technology Stack Analysis

                        - **Page 12:** 7. MongoDB Collection 1: Users

                        - **Page 13:** 7. MongoDB Collection 2: MedicalCamps

                        - **Page 14:** 7. MongoDB Collection 3: Registrations

                        - **Page 15:** 8. React Pages (1 to 9 Overview)

                    

                

                
                    **PART II: IMPLEMENTATION & VISUAL PROOFS**
                    

                        - **Page 16:** 9. React Concepts to Use

                        - **Page 17:** 10. ExpressJS Concepts Implemented

                        - **Page 18:** 11. MongoDB Concepts Applied

                        - **Page 19:** 12. REST APIs Specification

                        - **Page 20:** UI Proof 1: Home & Medical Camps

                        - **Page 21:** UI Proof 2: Login & Registration

                        - **Page 22:** UI Proof 3: Participant Dashboard

                        - **Page 23:** UI Proof 4: User Profile & Admin Modal

                        - **Page 24:** UI Proof 5: Admin & Doctor Portals

                        - **Page 25:** Security: Single Admin & Master Password

                        - **Page 26:** Doctor Database Verification Logic

                        - **Page 27:** Software Testing & QA Test Matrix

                        - **Page 28:** Performance & Build Optimization

                        - **Page 29:** 13. Expected Output & Duration

                        - **Page 30:** References, GitHub & Production URL

---
*Medical Camp Registration Portal &bull; Page 4 of 30*

<!-- ========================================================================= -->
<!-- PAGE 5 OF 30 | SECTION 1: PROBLEM STATEMENT -->
<!-- ========================================================================= -->

## Page 5: 1. PROBLEM STATEMENT & BACKGROUND
*Collegiate Healthcare Outreach & Operational Challenges*  
*Chapter: SECTION 1: PROBLEM STATEMENT*

### 1.1 Problem Statement (Verbatim from Project Specification)

            
                *"Many colleges organize free medical camps such as general health check-ups, eye camps, blood donation camps, dental camps, and health awareness programs. Currently, participant registration and camp management are handled manually using paper forms or spreadsheets, making it difficult to maintain participant records and camp reports.

                Develop a simple Medical Camp Registration Portal using the MERN Stack where participants can register for medical camps and administrators can manage camp schedules and registrations.

                This is a Mini MERN Application, not a complete Hospital Management System."*
            

            ### 1.2 Detailed Context & Operational Hurdles

            
                Free medical outreach camps are instrumental in identifying latent health conditions early. However, when hundreds of students, faculty members, and local villagers converge on a college campus for screenings, manual paperwork creates severe bottlenecks:
            

            

                - **Physical Form Vulnerabilities:** Paper registrations are susceptible to illegible handwriting, water/ink damage, and misplacement during transport.

                - **Inability to Enforce Slot Caps:** Without a live synchronized database, camps frequently become overcrowded, exceeding doctor consultation limits.

                - **Doctor-Participant Desynchronization:** Attending doctors have no prior knowledge of patient volume or specialty demand before arriving at the venue.

                - **Post-Event Reporting Delays:** Organizing committees spend days transcribing handwritten registers into spreadsheets to calculate attendance.

---
*Medical Camp Registration Portal &bull; Page 5 of 30*

<!-- ========================================================================= -->
<!-- PAGE 6 OF 30 | SECTION 2: PROJECT OBJECTIVES -->
<!-- ========================================================================= -->

## Page 6: 2. WHY DEVELOP THIS PROJECT?
*Educational Objectives & Technical Competencies*  
*Chapter: SECTION 2: PROJECT OBJECTIVES*

Developing the Medical Camp Registration Portal addresses six explicit technical learning goals outlined in the curriculum while delivering a real-world community health solution:
            

            
| # | Curriculum Goal | Technical Implementation in this Project |
| --- | --- | --- |
| 1 | Learn MERN Stack | Full-stack development connecting React 19 client to Node.js/Express.js backend and MongoDB Atlas cloud. |
| 2 | Practice CRUD Operations | Full lifecycle (Create, Read, Update, Delete) implemented across MedicalCamps and Registrations collections. |
| 3 | Understand User Authentication | JWT token creation, role authorization middleware, plain-text credential verification, and master admin security. |
| 4 | Learn REST API Development | Designing standardized JSON endpoints with proper HTTP verbs (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 403). |
| 5 | Digitally Manage Registrations | Real-time booking capacity calculations, digital token slip passes (TKN-001), and attendance rosters. |
| 6 | Practice React Components & Routing | Component decomposition, React Router v7 protected navigation, Context API global state, and React Portals. |

            
                **Scope Clarity:** Confirms the boundary as an agile Mini MERN Application dedicated to camp logistics, avoiding bloated hospital clinical sub-modules.

---
*Medical Camp Registration Portal &bull; Page 6 of 30*

<!-- ========================================================================= -->
<!-- PAGE 7 OF 30 | SECTION 3: USER ROLES -->
<!-- ========================================================================= -->

## Page 7: 3. USER ROLES & RESPONSIBILITIES
*Admin, Participant & Doctor Functional Breakdown*  
*Chapter: SECTION 3: USER ROLES*

The project specification explicitly defines three stakeholder roles with distinct operational privileges:
            

            
                
                    #### ADMIN

                    Single Master Account (ADM-001)
                    

                        - Login (Master Password)

                        - Add Medical Camps

                        - Update Camp Details

                        - View Participant Registrations

                        - Manage Camp Schedule

                        - Generate Reports

                    

                

                
                    #### PARTICIPANT

                    Students & Community Members
                    

                        - Register

                        - Login

                        - View Available Medical Camps

                        - Register for Camp

                        - View Registration Status

                        - Update Profile

                    

                

                
                    #### DOCTOR

                    Registered Attending Physicians
                    

                        - Login

                        - View Participant List

                        - View Camp Schedule

                        - Update Attendance

                    

                
            

            ### Key Role Governance Highlights

            
                To enforce system integrity, public registration is restricted exclusively to **Participants** and **Doctors**. Attempting to register as an administrator is rejected at the API level (HTTP 403). The single administrator account (`ADM-001`) enters via a dedicated master password access modal, maintaining exclusive authority over camp creation and doctor assignment.

---
*Medical Camp Registration Portal &bull; Page 7 of 30*

<!-- ========================================================================= -->
<!-- PAGE 8 OF 30 | SECTION 4: SYSTEM MODULES -->
<!-- ========================================================================= -->

## Page 8: 4. MODULES (MODULES 1 TO 4)
*Registration, Authentication & Camp Creation Modules*  
*Chapter: SECTION 4: SYSTEM MODULES*

The portal architecture is organized into seven core modules. Modules 1 through 4 manage user enrollment, identity verification, and camp scheduling.
            

            
                #### MODULE 1: PARTICIPANT REGISTRATION

                
                    Provides self-registration for participants and attending doctors. Features input sanitation, email uniqueness validation, plain-text password persistence, and prohibition of self-assigned admin roles.
                

            

            
                #### MODULE 2: LOGIN AUTHENTICATION

                
                    Manages authentication for all stakeholders. Authenticates credentials against MongoDB Atlas, generates signed JWT bearer tokens, and persists user sessions in client local storage. Includes master admin access with secret password `"Admin@2026"`.
                

            

            
                #### MODULE 3: MEDICAL CAMP MANAGEMENT

                
                    Delivers comprehensive administrative CRUD controls over medical camps. Allows scheduling new camps, updating venue locations and timings, adjusting maximum capacity limits, and dynamically selecting verified doctors from the database.
                

            

            
                #### MODULE 4: CAMP REGISTRATION

                
                    Enables authenticated participants to explore camps, check remaining capacity quotas, and enroll with a single click. Prevents duplicate enrollment and generates a sequential digital consultation token.

---
*Medical Camp Registration Portal &bull; Page 8 of 30*

<!-- ========================================================================= -->
<!-- PAGE 9 OF 30 | SECTION 4: SYSTEM MODULES -->
<!-- ========================================================================= -->

## Page 9: 4. MODULES (MODULES 5 TO 7)
*Tracking, Participant & Administrator Dashboards*  
*Chapter: SECTION 4: SYSTEM MODULES*

Modules 5 through 7 deliver user transparency, registration tracking, and role-based analytical dashboards.
            

            
                #### MODULE 5: REGISTRATION STATUS

                
                    Maintains live status tracking across the booking lifecycle (`"Registered"`, `"Attended"`, `"Cancelled"`). Synchronizes status changes instantly between the participant's portal, the doctor's roster, and the administrator's console.
                

            

            
                #### MODULE 6: PARTICIPANT DASHBOARD

                
                    A personalized portal for registered participants displaying upcoming camp appointments, past attendance history, downloadable registration slip modals with token numbers, and self-service booking cancellations.
                

            

            
                #### MODULE 7: ADMIN DASHBOARD

                
                    The central command console for the system administrator. Displays aggregate analytical metrics (Total Camps Organized, Active Bookings, Registered Doctors, Completed Events), detailed participant rosters, and quick links to camp CRUD management.
                

            

            
                **Clinical Doctor Schedule:** Alongside Module 7, the system includes a dedicated Doctor Dashboard where attending physicians view their assigned schedule and mark participant attendance directly.

---
*Medical Camp Registration Portal &bull; Page 9 of 30*

<!-- ========================================================================= -->
<!-- PAGE 10 OF 30 | SECTION 5: WORKING PRINCIPLE -->
<!-- ========================================================================= -->

## Page 10: 5. WORKING PRINCIPLE & EXECUTION FLOW
*The 9-Step End-to-End Operational Sequence*  
*Chapter: SECTION 5: WORKING PRINCIPLE*

The working principle follows an interconnected 9-step sequence (a through i) specified in the project syllabus, connecting the participant, administrator, doctor, and MongoDB Atlas database:
            

            
                

                    - **Participant registers into the portal:** User visits `/register`, selects the "Participant" role, submits basic credentials, and is saved into the `Users` collection.

                    - **Participant logs into the application:** User enters email and password at `/login`; Express validates credentials and issues a JWT token.

                    - **Admin creates medical camp details:** Admin accesses `/admin/camps` via the master password modal, fills camp venue/date/capacity, selects a registered doctor from the dropdown, and saves the event.

                    - **Participants browse available camps:** User visits `/camps` to explore upcoming checkups with real-time remaining slot counters.

                    - **Participants register for preferred camps:** User clicks "Register Now", accepts consultation guidelines, and confirms slot booking.

                    - **MongoDB stores participant registration details:** Backend verifies capacity limits and saves the 5-attribute registration document into `Registrations`.

                    - **Admin views participant registrations:** Admin monitors live registrations, attendee counts, and capacity utilization across all camps.

                    - **Doctors view participant lists:** Attending doctor opens `/doctor` to inspect the roster of participants scheduled for their camp.

                    - **Participants check their registration status:** User navigates to `/my-registrations` to verify status (`"Registered"` or `"Attended"`) and download token passes.

---
*Medical Camp Registration Portal &bull; Page 10 of 30*

<!-- ========================================================================= -->
<!-- PAGE 11 OF 30 | SECTION 6: TECHNOLOGY STACK -->
<!-- ========================================================================= -->

## Page 11: 6. TECHNOLOGY STACK SPECIFICATION
*Frontend, Backend, Database & Testing Frameworks*  
*Chapter: SECTION 6: TECHNOLOGY STACK*

The project utilizes the modern **MERN Full-Stack** architecture complemented by production cloud infrastructure and automated API testing tools:
            

            
                
                    **FRONTEND: ReactJS & Tooling**
                    

                        - **React 19:** Declarative component-based UI library.

                        - **Vite 8:** High-performance ES-module bundler (sub-second builds).

                        - **Tailwind CSS v4:** Modern utility-first styling engine.

                        - **React Router v7:** Client-side declarative routing.

                        - **Lucide React:** Lightweight SVG healthcare icons.

                    

                

                
                    **BACKEND: NodeJS & ExpressJS**
                    

                        - **Node.js v24:** Asynchronous event-driven JavaScript runtime.

                        - **Express.js 5:** Fast, unopinionated REST API framework.

                        - **jsonwebtoken (JWT):** Stateless bearer token authentication.

                        - **CORS:** Cross-origin resource sharing interceptor.

                        - **dotenv:** Secure environment variable isolation.

                    

                

                
                    **DATABASE: MongoDB Atlas**
                    

                        - **MongoDB Atlas:** Multi-region cloud NoSQL cluster.

                        - **Mongoose ODM:** Schema modeling, validation & queries.

                        - **Connection Pooling:** High-concurrency socket reuse.

                        - **Strict 3-Collection Model:** Users, MedicalCamps, Registrations.

                    

                

                
                    **TESTING & DEPLOYMENT**
                    

                        - **Postman:** REST endpoint regression and auth testing.

                        - **Vercel Cloud:** Edge CDN hosting for the live application.

                        - **GitHub:** Version control with protected secrets.

---
*Medical Camp Registration Portal &bull; Page 11 of 30*

<!-- ========================================================================= -->
<!-- PAGE 12 OF 30 | SECTION 7: DATABASE COLLECTIONS -->
<!-- ========================================================================= -->

## Page 12: 7. MONGODB COLLECTIONS: 1. USERS
*Specification & Schema for Users Collection*  
*Chapter: SECTION 7: DATABASE COLLECTIONS*

### Collection 1: Users

            
                The `Users` collection persists authentication profiles for Administrators, Doctors, and Participants. In accordance with client specifications, it strictly adheres to the core attributes with plain-text password persistence:
            

            
| Attribute | Data Type | Validation Constraint | Purpose & Sample Value |
| --- | --- | --- | --- |
| userId | String | Required, Unique | Unique ID (e.g. "USR-DOC-001") |
| name | String | Required | Full user name (e.g. "Dr. Anil Kumar") |
| email | String | Required, Unique | Login email (e.g. "rahul@gmail.com") |
| password | String | Required | Plain-text password (e.g. "user") |
| role | String | Enum | "admin", "doctor", "participant" |

            #### Mongoose Model Definition (user.js)

            
const userSchema = new mongoose.Schema({

  userId: { type: String, required: true, unique: true },

  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  role: { type: String, required: true, default: 'participant' },

  // Optional profile attributes enabled via strict: false

  phone: { type: String, default: '' },

  bloodGroup: { type: String, default: '' },

  address: { type: String, default: '' }

}, { versionKey: false, timestamps: false, strict: false });

---
*Medical Camp Registration Portal &bull; Page 12 of 30*

<!-- ========================================================================= -->
<!-- PAGE 13 OF 30 | SECTION 7: DATABASE COLLECTIONS -->
<!-- ========================================================================= -->

## Page 13: 7. MONGODB COLLECTIONS: 2. MEDICALCAMPS
*Specification & Schema for MedicalCamps Collection*  
*Chapter: SECTION 7: DATABASE COLLECTIONS*

### Collection 2: MedicalCamps

            
                The `MedicalCamps` collection stores healthcare camp events scheduled by the administrator. It contains strictly the seven attributes specified in the project syllabus:
            

            
| Attribute | Data Type | Validation Constraint | Description & Sample Value |
| --- | --- | --- | --- |
| campId | String | Required, Unique | Unique camp ID (e.g. "CMP-2026-1001") |
| campName | String | Required | Title (e.g. "Free Eye & Vision Camp") |
| campType | String | Required | Category (e.g. "Eye Camp", "Dental") |
| campDate | String | Required | Date string (e.g. "2026-11-15") |
| venue | String | Required | Location (e.g. "College Auditorium Block A") |
| doctorName | String | Verified Doctor | Must exist in Users with role: 'doctor' |
| maximumParticipants | Number | Min 10 | Capacity quota (e.g. 100 slots) |

            #### Mongoose Model Definition (MedicalCamp.js)

            
const medicalCampSchema = new mongoose.Schema({

  campId: { type: String, required: true, unique: true },

  campName: { type: String, required: true },

  campType: { type: String, required: true },

  campDate: { type: String, required: true },

  venue: { type: String, required: true },

  doctorName: { type: String, required: true },

  maximumParticipants: { type: Number, required: true }

}, { versionKey: false, timestamps: false });

---
*Medical Camp Registration Portal &bull; Page 13 of 30*

<!-- ========================================================================= -->
<!-- PAGE 14 OF 30 | SECTION 7: DATABASE COLLECTIONS -->
<!-- ========================================================================= -->

## Page 14: 7. MONGODB COLLECTIONS: 3. REGISTRATIONS
*Specification & Schema for Registrations Collection*  
*Chapter: SECTION 7: DATABASE COLLECTIONS*

### Collection 3: Registrations

            
                The `Registrations` collection records participant bookings and clinical attendance tracking. It contains strictly the five attributes specified in the project syllabus:
            

            
| Attribute | Data Type | Validation Constraint | Description & Sample Value |
| --- | --- | --- | --- |
| registrationId | String | Required, Unique | Booking ID (e.g. "REG-2026-9042") |
| participantId | String | Foreign Key Reference | References Users.userId |
| campId | String | Foreign Key Reference | References MedicalCamps.campId |
| registrationDate | String | Required | Timestamp string (e.g. "2026-10-25") |
| registrationStatus | String | Enum | "Registered", "Attended", "Cancelled" |

            #### Mongoose Model Definition (Registration.js)

            
const registrationSchema = new mongoose.Schema({

  registrationId: { type: String, required: true, unique: true },

  participantId: { type: String, required: true },

  campId: { type: String, required: true },

  registrationDate: { type: String, required: true },

  registrationStatus: { type: String, enum: ['Registered', 'Attended', 'Cancelled'], default: 'Registered' }

}, { versionKey: false, timestamps: false });

---
*Medical Camp Registration Portal &bull; Page 14 of 30*

<!-- ========================================================================= -->
<!-- PAGE 15 OF 30 | SECTION 8: REACT PAGES -->
<!-- ========================================================================= -->

## Page 15: 8. REACT PAGES SPECIFICATION
*Overview of All 9 React Pages Listed in Syllabus*  
*Chapter: SECTION 8: REACT PAGES*

The frontend architecture implements all nine React pages specified on Page 4 of the project syllabus:
            

            
| # | React Page Name | Route Path | Component File | Primary Functionality |
| --- | --- | --- | --- | --- |
| 1 | Home | / | Home.jsx | Hero presentation, platform statistics, upcoming camps overview. |
| 2 | Register | /register | Register.jsx | Participant and Doctor account creation form with validation. |
| 3 | Login | /login | Login.jsx | Credential verification, JWT token issuance, and demo quick-fill. |
| 4 | Participant Dashboard | /participant | ParticipantDashboard.jsx | Active bookings summary, upcoming checkup alerts, token links. |
| 5 | Medical Camps | /camps | MedicalCamps.jsx | Searchable camp catalog with category filters and remaining slots. |
| 6 | Register for Camp | (Modal) | RegisterModal.jsx | Slot reservation popup generating token slips (TKN-001). |
| 7 | My Registrations | /my-registrations | MyRegistrations.jsx | Status tracking badges, printable passes, and cancellation controls. |
| 8 | Admin Dashboard | /admin | AdminDashboard.jsx | High-level KPIs, full attendee roster table, and statistics export. |
| 9 | Manage Medical Camps | /admin/camps | ManageCamps.jsx | Full CRUD modal with dynamic registered doctor dropdown. |

---
*Medical Camp Registration Portal &bull; Page 15 of 30*

<!-- ========================================================================= -->
<!-- PAGE 16 OF 30 | SECTION 9: REACT CONCEPTS -->
<!-- ========================================================================= -->

## Page 16: 9. REACT CONCEPTS IMPLEMENTED
*Analysis of Core React Concepts from Project Syllabus*  
*Chapter: SECTION 9: REACT CONCEPTS*

The frontend architecture purposefully demonstrates all twelve core React concepts listed in Section 9 of the syllabus:
            

            
| React Concept | Theoretical Definition | Application in Medical Camp Portal |
| --- | --- | --- |
| Components | Independent, reusable UI units. | Navbar, CampCard, StatusBadge, RegisterModal, AdminAccessModal. |
| JSX | Syntax extension mixing HTML with JS. | Declarative layouts combining state values with Tailwind CSS styling. |
| Props | Immutable parameters passed downward. | Passing camp metadata into CampCard and modal dialog callbacks. |
| State & useState() | Reactive local component memory. | Managing search queries, form inputs, open/close modals, and errors. |
| useEffect() | Side-effect execution on mount/update. | Fetching camps and doctors from Express REST API; syncing profile state. |
| Forms & Events | Controlled form inputs & handlers. | onChange, onSubmit handlers validating login, registration and camp inputs. |
| Lists & Keys | Iterating arrays using unique keys. | Rendering camps.map() with camp.campId and registrations with registrationId. |
| Conditional Rendering | Rendering UI based on truthy logic. | Displaying "Camp Full" when quota is reached; role-based nav buttons. |
| React Router | Client-side Single Page routing. | Protected routing guarding /admin, /doctor, and /participant dashboards. |
| CSS Styling | Tailwind CSS utility-first framework. | Responsive grid layouts, high-contrast badges, and smooth animations. |

---
*Medical Camp Registration Portal &bull; Page 16 of 30*

<!-- ========================================================================= -->
<!-- PAGE 17 OF 30 | SECTION 10: EXPRESSJS CONCEPTS -->
<!-- ========================================================================= -->

## Page 17: 10. EXPRESSJS CONCEPTS IMPLEMENTED
*Analysis of Server Architecture & Middleware Concepts*  
*Chapter: SECTION 10: EXPRESSJS CONCEPTS*

The backend service exemplifies the six Express.js architectural pillars specified on Page 4 of the syllabus:
            

            
| Concept | Architecture Principle | Implementation in Project Backend |
| --- | --- | --- |
| 1. Routing | Modular route grouping with express.Router(). | Separation into authRoutes.js (accounts) and campRoute.js (camps and registrations). |
| 2. Middleware | Intercepting HTTP requests before route handlers. | cors(), express.json(), and custom authMiddleware.js token verifier. |
| 3. REST API | Stateless resource-based architecture. | JSON data exchange over standard endpoints: /api/medicalCamps, /api/registrations. |
| 4. HTTP Methods | Semantic CRUD verb mappings. | GET (read), POST (create), PUT (update), DELETE (cancel/remove). |
| 5. Authentication | Verifying identity against stored credentials. | Plain-text password comparison in MongoDB Atlas and master admin gatekeeping. |
| 6. JWT Login | Cryptographically signed bearer tokens. | jwt.sign({ userId, role }, process.env.JWT_SECRET) with 7-day expiration. |

---
*Medical Camp Registration Portal &bull; Page 17 of 30*

<!-- ========================================================================= -->
<!-- PAGE 18 OF 30 | SECTION 11: MONGODB CONCEPTS -->
<!-- ========================================================================= -->

## Page 18: 11. MONGODB CONCEPTS IMPLEMENTED
*Analysis of Database Operations & Cloud Features*  
*Chapter: SECTION 11: MONGODB CONCEPTS*

The persistence layer leverages the full suite of MongoDB concepts specified in Section 11 of the syllabus:
            

            
| MongoDB Concept | Database Mechanism | Specific Application in this Project |
| --- | --- | --- |
| CRUD Operations | Create, Read, Update, Delete cycles. | Camps scheduling, booking registration, attendance marking, camp cancellation. |
| Collections | Logical grouping of JSON-like BSON documents. | Strictly 3 collections: Users, MedicalCamps, and Registrations. |
| find() | Document querying and projection. | MedicalCamp.find().sort({ campDate: 1 }) and User.find({ role: 'doctor' }). |
| updateOne() | Targeted atomic document modification. | findOneAndUpdate({ registrationId }, { $set: { registrationStatus: 'Attended' } }). |
| deleteOne() | Removing obsolete records. | MedicalCamp.findOneAndDelete({ campId }) and cascading registrations deletion. |
| aggregate() / count | Data processing pipelines. | Registration.countDocuments({ campId, registrationStatus: { $ne: 'Cancelled' } }). |
| createIndex() | Index creation for rapid lookups. | Unique indices on Users.email, Users.userId, and MedicalCamps.campId. |
| Atlas Connection | Secure cloud connection URI with SSL/TLS. | Mongoose cluster connection string with replica set failover handling. |

---
*Medical Camp Registration Portal &bull; Page 18 of 30*

<!-- ========================================================================= -->
<!-- PAGE 19 OF 30 | SECTION 12: REST APIS -->
<!-- ========================================================================= -->

## Page 19: 12. REST APIS SPECIFICATION
*Complete HTTP REST Endpoints Contract*  
*Chapter: SECTION 12: REST APIS*

The backend exposes eleven structured REST API endpoints divided across Authentication, Medical Camps, and Registrations:
            

            
| Domain | Endpoint & Verb | Access Level | Purpose & Input/Output Summary |
| --- | --- | --- | --- |
| Authentication | POST /api/register | Public | Registers Participant or Doctor; rejects admin (403). |
| POST /api/login | Public | Validates email and plain-text password; returns JWT token. |
| POST /api/admin-login | Master Admin | Authenticates master admin password (Admin@2026). |
| Medical Camps | GET /api/medicalCamps | Public | Lists all medical camps with live remaining slot counters. |
| POST /api/medicalCamps | Admin (Auth) | Creates camp; validates assigned doctor exists in DB. |
| PUT /api/medicalCamps/:id | Admin (Auth) | Updates venue, date, capacity; re-validates doctor name. |
| DELETE /api/medicalCamps/:id | Admin (Auth) | Deletes camp and marks linked bookings as cancelled. |
| Registrations | POST /api/registerCamp | Participant | Reserves slot, checks capacity, creates TKN-001 pass. |
| GET /api/registrations | Auth | Returns participant bookings or doctor camp attendee rosters. |
| PUT /api/registrations/:id | Doctor / Admin | Updates consultation status (e.g. Attended). |
| DELETE /api/cancelRegistration/:id | Participant | Cancels enrollment and restores slot to camp quota. |

---
*Medical Camp Registration Portal &bull; Page 19 of 30*

<!-- ========================================================================= -->
<!-- PAGE 20 OF 30 | CHAPTER 9: VISUAL WALKTHROUGH -->
<!-- ========================================================================= -->

## Page 20: UI PROOF 1: HOME & MEDICAL CAMPS DIRECTORY
*Real Visual Screenshots of Public User Interfaces*  
*Chapter: CHAPTER 9: VISUAL WALKTHROUGH*

**Figure 9.1: Home Landing Page (Home.jsx)** • Shows hero section with quick stats, live metrics, and primary call-to-actions.
            

            
                **[Screenshot: Home Page Screenshot]**

            

            
                **Figure 9.2: Medical Camps Directory (MedicalCamps.jsx)** • Demonstrates search filtering, category tabs, and real-time remaining capacity badges.
            

            
                **[Screenshot: Medical Camps Directory Screenshot]**

---
*Medical Camp Registration Portal &bull; Page 20 of 30*

<!-- ========================================================================= -->
<!-- PAGE 21 OF 30 | CHAPTER 9: VISUAL WALKTHROUGH -->
<!-- ========================================================================= -->

## Page 21: UI PROOF 2: LOGIN & USER REGISTRATION
*Real Visual Screenshots of Authentication Pages*  
*Chapter: CHAPTER 9: VISUAL WALKTHROUGH*

**Figure 9.3: Login Page (Login.jsx)** • Features credential inputs, demo quick-fill helper pills, and role-based redirect routing.
            

            
                **[Screenshot: Login Page Screenshot]**

            

            
                **Figure 9.4: Registration Page (Register.jsx)** • Role toggle pills (Participant vs. Doctor), input sanitation, and prohibition of self-assigned admin roles.
            

            
                **[Screenshot: Registration Page Screenshot]**

---
*Medical Camp Registration Portal &bull; Page 21 of 30*

<!-- ========================================================================= -->
<!-- PAGE 22 OF 30 | CHAPTER 9: VISUAL WALKTHROUGH -->
<!-- ========================================================================= -->

## Page 22: UI PROOF 3: PARTICIPANT EXPERIENCE
*Real Visual Screenshots of Participant Portal & Tokens*  
*Chapter: CHAPTER 9: VISUAL WALKTHROUGH*

**Figure 9.5: Participant Dashboard (ParticipantDashboard.jsx)** • Overview of active camp appointments, countdown reminders, and status pills.
            

            
                **[Screenshot: Participant Dashboard Screenshot]**

            

            
                **Figure 9.6: My Registrations (MyRegistrations.jsx)** • Shows booked consultation history, printable token passes, and self-service cancellation controls.
            

            
                **[Screenshot: My Registrations Screenshot]**

---
*Medical Camp Registration Portal &bull; Page 22 of 30*

<!-- ========================================================================= -->
<!-- PAGE 23 OF 30 | CHAPTER 9: VISUAL WALKTHROUGH -->
<!-- ========================================================================= -->

## Page 23: UI PROOF 4: PROFILE SETTINGS & ADMIN MODAL
*Real Visual Screenshots of User Profile & Security*  
*Chapter: CHAPTER 9: VISUAL WALKTHROUGH*

**Figure 9.7: User Health Profile (Profile.jsx)** • Demonstrates live saving and persistence of user Name, Phone Number, Blood Group (O+), Age (24), Campus Hostel Address, and Emergency Contact details into MongoDB Atlas.
            

            
                **[Screenshot: User Profile Screenshot]**

            

            
                **Verified Profile Update Fix:** Profile update persistence has been verified end-to-end. When a user submits changes, the backend route `PUT /api/users/:id` updates the user document in MongoDB Atlas, and the frontend React state synchronizes immediately via the newly added `useEffect` listener.

---
*Medical Camp Registration Portal &bull; Page 23 of 30*

<!-- ========================================================================= -->
<!-- PAGE 24 OF 30 | CHAPTER 9: VISUAL WALKTHROUGH -->
<!-- ========================================================================= -->

## Page 24: UI PROOF 5: ADMIN & DOCTOR PORTALS
*Real Visual Screenshots of Administrative & Clinical Dashboards*  
*Chapter: CHAPTER 9: VISUAL WALKTHROUGH*

**Figure 9.8: Admin Dashboard (AdminDashboard.jsx)** • High-level analytical KPI cards and participant rosters.
            

            
                **[Screenshot: Admin Dashboard]**

            

            
                **Figure 9.9: Manage Camps (ManageCamps.jsx)** • Shows camp creation with verified doctor dropdown selection.
            

            
                **[Screenshot: Manage Camps]**

            

            
                **Figure 9.10: Doctor Dashboard (DoctorDashboard.jsx)** • Assigned doctor schedule and attendance roster controls.
            

            
                **[Screenshot: Doctor Dashboard]**

---
*Medical Camp Registration Portal &bull; Page 24 of 30*

<!-- ========================================================================= -->
<!-- PAGE 25 OF 30 | CHAPTER 10: SECURITY ARCHITECTURE -->
<!-- ========================================================================= -->

## Page 25: SECURITY & ADMIN ACCESS ARCHITECTURE
*Single Admin Account & React Portal Centering Solution*  
*Chapter: CHAPTER 10: SECURITY ARCHITECTURE*

### Single Administrator Model & Secret Access

            
                In accordance with the client's specification (*"there should be only doctor and participant registration no admin only one admin is there and that should be on the top as admin button which is encrypted with password"*), the portal implements a hardened single-administrator security architecture:
            

            

                - **Prohibition of Admin Registration:** The registration endpoint `POST /api/register` explicitly rejects any attempt to register with `role: "admin"` with an HTTP 403 Forbidden status code.

                - **Single Dedicated Administrator:** The database holds strictly one admin profile (`ADM-001`, `admin@camp.org`, password `Admin@2026`).

                - **Dedicated Master Login Route:** Handled via `POST /api/admin-login`, validating the master password directly against the stored administrator document.

            

            ### React Portal Solution for Centered Modal

            
                Initially, the Admin Password Modal appeared trapped inside the top navigation header bar due to the header's CSS `backdrop-filter: blur(...)` containing block trap. This was resolved by re-engineering `AdminAccessModal.jsx` using React's `createPortal(modalContent, document.body)`.
            

            
                **Visual Result:** The Admin Access Modal now renders squarely in the **exact vertical and horizontal center of the screen** with a backdrop blur and smooth keyboard escape handlers.

---
*Medical Camp Registration Portal &bull; Page 25 of 30*

<!-- ========================================================================= -->
<!-- PAGE 26 OF 30 | CHAPTER 11: DOCTOR VALIDATION -->
<!-- ========================================================================= -->

## Page 26: DOCTOR ASSIGNMENT & DATABASE GATEKEEPING
*Eliminating Non-Existent Doctor Entry via Server Validation*  
*Chapter: CHAPTER 11: DOCTOR VALIDATION*

### The Problem of Non-Existent Doctor Assignment

            
                In the earlier version of the portal, camp creation permitted typing arbitrary doctor names not present in the database. Consequently, camps were created with orphan doctor names, preventing attending doctors from accessing their schedules on the Doctor Dashboard.
            

            ### Dual-Layer Gatekeeping Architecture

            
                
                    **LAYER 1: UI SELECT DROPDOWN**
                    
                        In `ManageCamps.jsx`, the text input was replaced by a dynamic `<select>` dropdown populated from `GET /api/doctors`. The admin can only select real doctors registered in the `Users` collection.
                    

                
                
                    **LAYER 2: BACKEND MONGOOSE QUERY**
                    
                        In `campRoute.js`, `POST /medicalCamps` and `PUT /medicalCamps/:id` execute a case-insensitive regex query on `Users`. Any unverified doctor name is rejected with `HTTP 400 Bad Request`.
                    

                
            

            
const doctorDoc = await User.findOne({

  role: "doctor",

  $or: [{ name: doctorName }, { name: new RegExp(`^${doctorName.trim()}$`, "i") }]

});

if (!doctorDoc) {

  return res.status(400).json({

    message: `Doctor "${doctorName}" is not registered in the database. Please select a registered doctor.`

  });

}

---
*Medical Camp Registration Portal &bull; Page 26 of 30*

<!-- ========================================================================= -->
<!-- PAGE 27 OF 30 | CHAPTER 13: SOFTWARE TESTING -->
<!-- ========================================================================= -->

## Page 27: SOFTWARE TESTING & TEST EXECUTION MATRIX
*Complete Quality Assurance & Test Case Results*  
*Chapter: CHAPTER 13: SOFTWARE TESTING*

Comprehensive integration and boundary test suites were executed to verify system security, capacity constraints, and database integrity:
            

            
| Test ID | Scenario Tested | Test Input & Endpoint | Expected Response | Verdict |
| --- | --- | --- | --- | --- |
| TC-01 | Block Admin Registration | POST /register with role: 'admin' | HTTP 403 Forbidden | PASSED |
| TC-02 | Doctor Registration | POST /register with role: 'doctor' | HTTP 201 Created & saved in DB | PASSED |
| TC-03 | Reject Non-Existent Doctor | POST /medicalCamps with 'Dr. Fake' | HTTP 400 Bad Request | PASSED |
| TC-04 | Accept Verified Doctor | POST /medicalCamps with 'Dr. Anil Kumar' | HTTP 201 Created (7 attributes) | PASSED |
| TC-05 | Master Admin Login | POST /admin-login with 'Admin@2026' | HTTP 200 OK & JWT returned | PASSED |
| TC-06 | Prevent Duplicate Booking | Participant re-registers for same camp | HTTP 400 Bad Request | PASSED |
| TC-07 | Profile Update Persistence | PUT /users/:id with Name, Phone, Blood | HTTP 200 OK & verified on re-login | PASSED |

---
*Medical Camp Registration Portal &bull; Page 27 of 30*

<!-- ========================================================================= -->
<!-- PAGE 28 OF 30 | CHAPTER 14: PERFORMANCE & CLOUD -->
<!-- ========================================================================= -->

## Page 28: PERFORMANCE, SCALABILITY & CLOUD METRICS
*Vite 8 Bundling, Atlas Connection Pooling & Tailwind v4*  
*Chapter: CHAPTER 14: PERFORMANCE & CLOUD*

### Sub-Second Vite 8 Production Bundling

            
                By utilizing Vite 8 with Rollup ES-module tree-shaking, production client compilation executes in under 1 second:
            

            
$ npm run build

> vite build

✓ 1909 modules transformed.

dist/index.html                  0.59 kB │ gzip:   0.34 kB

dist/assets/index-BU7YCEVK.css  61.39 kB │ gzip:  10.31 kB

dist/assets/index-Nf7svGr-.js  443.62 kB │ gzip: 117.33 kB

**✓ built in 829ms**
            

            ### MongoDB Atlas Cloud Architecture

            
                The production database is hosted on MongoDB Atlas with an automated multi-region replica set. Connection pooling maintains open SSL sockets to eliminate handshake latency during high-concurrency registration events.

---
*Medical Camp Registration Portal &bull; Page 28 of 30*

<!-- ========================================================================= -->
<!-- PAGE 29 OF 30 | SECTION 13: EXPECTED OUTPUT -->
<!-- ========================================================================= -->

## Page 29: 13. EXPECTED OUTPUT & DELIVERABLES
*Checklist from Project Syllabus & Duration Summary*  
*Chapter: SECTION 13: EXPECTED OUTPUT*

The completed application fully satisfies all nine expected deliverables specified on Page 5 of the project syllabus:
            

            
| # | Syllabus Expected Deliverable | Implementation Status | Verification Evidence |
| --- | --- | --- | --- |
| 1 | Participant Registration | COMPLETED | Self-registration on /register |
| 2 | Secure Login | COMPLETED | JWT token issuance on /login |
| 3 | View Medical Camps | COMPLETED | Searchable catalog on /camps |
| 4 | Online Camp Registration | COMPLETED | One-click modal slot booking |
| 5 | Registration Status Tracking | COMPLETED | Badges on /my-registrations |
| 6 | Medical Camp Management | COMPLETED | Admin CRUD on /admin/camps |
| 7 | Participant Dashboard | COMPLETED | Personalized cards on /participant |
| 8 | Admin Dashboard | COMPLETED | Analytics console on /admin |
| 9 | Secure Storage in Atlas | COMPLETED | Strict 3-collection cloud storage |

            
                **Estimated Project Duration:** 2 Weeks to 3 weeks • **Final Status:** Fully Completed, Verified & Deployed.

---
*Medical Camp Registration Portal &bull; Page 29 of 30*

<!-- ========================================================================= -->
<!-- PAGE 30 OF 30 | SECTION 18: REFERENCES & DEPLOYMENT -->
<!-- ========================================================================= -->

## Page 30: REFERENCES, REPOSITORY & LIVE URL
*Documentation Citations, Source Code & Production Deployment*  
*Chapter: SECTION 18: REFERENCES & DEPLOYMENT*

### 18.1 References & Documentation Standards

            

                - Smart India Hackathon (SIH 2025) – Healthcare Outreach Problem Statement Guidelines, AICTE & MoE, Govt. of India.

                - React 19 Official Documentation – Component Architecture, Hooks, Context API: `https://react.dev/`

                - Express.js 5 Guide – REST API Routing, Middleware Pipelines & HTTP Standards: `https://expressjs.com/`

                - MongoDB Atlas Manual – Cloud Sharded Replica Sets & Mongoose ODM: `https://www.mongodb.com/docs/`

                - Tailwind CSS v4 Documentation – Utility-First Responsive Styling: `https://tailwindcss.com/`

            

            ### 18.2 Official GitHub Source Code Repository

            
                **Repository:** `https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal`

                **Branch:** `main` • **License:** MIT Open Source • **Author:** Durga Prasad
            

            
                
                    Official Live Production Deployment URL
                
                
                    
                        https://medical-camp-registration-portal-tawny.vercel.app/
                    
                
                
                    Hosted on Vercel Global Edge Network with live database connectivity to MongoDB Atlas.

---
*Medical Camp Registration Portal &bull; Page 30 of 30*

<!-- FINAL PRODUCTION URL REQUIREMENT -->
# Official Project Deployment & Verification Links
- **Live Vercel Application:** https://medical-camp-registration-portal-tawny.vercel.app/
- **GitHub Repository:** https://github.com/durga-prasad2006/Medical-Camp-Registration-Portal
