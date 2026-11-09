# Shankar Chaudhary Portfolio - Dynamic Admin CMS & Backend Guide

Welcome to your production-grade, dynamic Content Management System (CMS) and Admin Dashboard. This system enables you to update, publish, upload, edit, and organize every piece of content on your portfolio website directly through the browser without modifying code, opening VS Code, or redeploying.

---

## 1. Quick Start

### Prerequisites
- **Node.js**: v18 or later
- **Java**: Java 21 LTS (Eclipse Temurin 21 installed at `/Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home`)
- **Maven**: 3.9+ (included in PATH)

### Starting the Application

#### Step 1: Start the Spring Boot Backend (Port 8080)
Open a terminal in the project root:
```bash
./start-backend.sh
```
*Or using npm / maven:*
```bash
npm run backend:dev
```
The backend initializes the persistent database, configures Spring Security, and serves REST APIs at `http://localhost:8080`.

#### Step 2: Start the React Frontend (Port 5173)
In a second terminal window:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 2. Admin Portal & Authentication

### Accessing the Admin Portal
- **Admin URL**: [http://localhost:5173/admin](http://localhost:5173/admin)
- Also accessible via the subtle shield icon in the top navigation bar or the footer owner link.

### Security Architecture
- **Single Authorized Owner**: Only your registered mobile number is recognized:
  ```
  Registered Mobile: 9905340058
  ```
  Any attempt to authenticate with any other mobile number is rejected immediately.
- **No Public Registration**: Public signups, registrations, or guest accounts are completely disabled at both the API and database levels.
- **BCrypt Hashing**: Passwords are never stored in plaintext. They are salted and hashed using BCrypt.
- **Stateless JWT**: Sessions use short-lived HMAC-SHA256 JSON Web Tokens with a configurable secret.
- **Rate Limiting & Lockout**: After **5 consecutive failed login attempts**, the account is temporarily locked for **15 minutes** to prevent brute-force attacks.
- **One-Time Initial Password Setup**:
  1. On first boot, visit `http://localhost:5173/admin`.
  2. The portal detects that no password has been configured yet.
  3. Enter your registered mobile `9905340058` and set a strong password (minimum 8 characters).
  4. The system securely prints a **32-character Emergency Recovery Key**. Save this key in a secure location.
- **Emergency Password Recovery**:
  If you ever forget your password, click **"Forgot password?"** on the login screen. Enter your mobile `9905340058` and your Emergency Recovery Key to set a new password.

---

## 3. Dashboard Modules

Once logged in, you have access to a modern, responsive, dark/light mode admin dashboard with real-time stats and management views:

### 1. Dashboard Overview
- Live metrics: Total projects, published skills, certificates, uploaded documents, education records, and unread inquiries.
- Quick action buttons to jump directly to any editor.
- Website status indicator with direct links to the public site.

### 2. Personal Profile Management
- **Fields**: Full Name, Display Name, Professional Title, Short Intro, Hero Heading, Hero Subtitle, Detailed Biography, Location, Current Professional Status, Career Goals.
- **Profile Photo Upload**: Upload image files (JPG, PNG, WebP) directly through the browser. Changes reflect immediately on the Home and About pages.

### 3. About Page Management
- Edit your Developer Journey narrative.
- Manage Career Goals and engineering philosophy.
- Add, edit, or delete items in the Progression Timeline.

### 4. Education Management
- Add, update, or remove academic records.
- Fields: Degree, Institution, University, Branch, Current Semester / Academic Standing, Start Year, End Year, Description, Location, and Institution Logo.
- Toggle visibility on/off without deleting records.

### 5. Skills Management
- Manage skills organized into 7 distinct categories:
  - *Programming Languages*
  - *Frontend Development*
  - *Backend Development*
  - *Databases*
  - *Frameworks*
  - *Developer Tools*
  - *Other Technical Skills*
- Upload custom SVG/PNG technology icons.
- Toggle **Featured** status (featured skills are highlighted on the Home page).
- Reorder skills or hide technologies.

### 6. Project Management
- Full lifecycle management for your software projects.
- Fields: Title, Category, Short Description, Detailed Description, Technology Stack tags, GitHub Repository URL, Live Demo URL, Project Dates, Status (Completed, In Progress).
- **Thumbnail & Screenshots**: Upload high-resolution cover thumbnails and multiple project screenshots.
- **Featured Toggle**: Mark as featured to display on the Home page.
- **Duplicate Project**: Clone an existing project template with one click.
- Safe link handling: Placeholder text is never rendered as broken clickable links.

### 7. Certificate & Achievements Management
- Add professional certificates, certifications, and awards.
- Upload certificate images or PDF documents.
- Add issuing organization, issue date, and credential verification links.

### 8. Document & Resume Management
- Upload PDF resumes and supporting credentials.
- Toggle **"Set as Active Resume"**: The active resume is automatically connected to the **"Download Resume"** buttons across the entire website.
- View file size, upload timestamp, and preview documents.

### 9. Contact & Social Profiles
- Manage public contact coordinates: Email, Mobile Phone, Physical Location, Headline.
- Social Links: GitHub, LinkedIn, Instagram, Twitter / X.
- Toggle the public contact form on or off.

### 10. Messages & Contact Form Inbox
- All inquiries submitted by visitors through the public Contact page are stored in the database.
- Admin features: View sender name, email, subject, message body, date received, mark as read/unread, and delete spam.
- **Honeypot Spam Protection**: Silent spam bot traps filter automated submissions without annoying CAPTCHAs.

### 11. Security & Settings
- Change your admin password.
- Generate a new Emergency Recovery Key.
- Configure website SEO title, meta description, and maintenance mode.
- Secure one-click session logout.

---

## 4. Architecture & Data Strategy

### Hybrid Resilient Architecture
```
                  ┌───────────────────────────────┐
                  │    React 18 + Vite (SPA)      │
                  │  (Home, About, Skills, etc.)  │
                  └───────────────┬───────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │  PortfolioContext (Hook)  │
                    └───────┬───────────┬───────┘
                            │           │
                 Live HTTP  │           │ Fallback
                            ▼           ▼
        ┌─────────────────────────┐  ┌───────────────────────┐
        │  Spring Boot 3 Backend  │  │  portfolioData.js     │
        │  (Port 8080 / REST)     │  │  (Zero-break Offline) │
        └───────────┬─────────────┘  └───────────────────────┘
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
┌──────────────────┐  ┌────────────────────────┐
│ Persistent H2 DB │  │ MariaDB / MySQL Profile│
│ (Zero-config)    │  │ (Enterprise ready)     │
└──────────────────┘  └────────────────────────┘
```

1. **When Spring Boot is running**:
   All public pages fetch live, updated data from the database. Edits made in the Admin Dashboard take effect immediately.
2. **When Spring Boot is stopped or offline**:
   The frontend automatically falls back to `src/data/portfolioData.js` with **zero console errors, zero broken layouts, and zero loading spinners**.

---

## 5. Database Options

### Default: Zero-Configuration Persistent H2
- The backend defaults to an embedded, persistent H2 file database stored in `backend/data/portfoliodb.mv.db`.
- No separate database server installation or setup is required. Data persists across restarts.

### MariaDB / MySQL Setup (Optional)
To use a standalone MariaDB or MySQL database:
1. Create a database:
   ```sql
   CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
2. Set environment variables in `.env` or run:
   ```bash
   SPRING_PROFILES_ACTIVE=mysql \
   DB_HOST=localhost \
   DB_PORT=3306 \
   DB_NAME=portfolio_db \
   DB_USER=portfolio_user \
   DB_PASSWORD=your_password \
   ./start-backend.sh
   ```

---

## 6. File Uploads & Storage

- Uploaded files are stored on disk in `backend/uploads/`.
- File security checks:
  - Whitelist of allowed extensions (`.jpg`, `.jpeg`, `.png`, `.webp`, `.pdf`, `.svg`).
  - Strict rejection of executables (`.exe`, `.sh`, `.bat`, `.js`, etc.).
  - Unique UUID file naming to prevent collisions and path-traversal attacks.
- Files are served directly at `/uploads/{filename}` by Spring MVC and proxied seamlessly by Vite in development mode.

---

## 7. Verification Checklist

- [x] Admin Login at `/admin` restricted to mobile `9905340058`.
- [x] Password hashed using BCrypt.
- [x] Rate limiting & 15-minute temporary lockout after 5 failed attempts.
- [x] One-time setup & Emergency Recovery Key.
- [x] Dynamic Personal Profile, About, Education, Skills, and Projects managers.
- [x] Certificate & Document (Resume) management with active resume toggle.
- [x] Contact message inbox with honeypot spam protection.
- [x] Fallback to centralized `portfolioData.js` when backend is offline.
- [x] Both `npm run build` and `mvn package` build cleanly with 0 errors.

