# Portfolio Content Management & Editing Guide

Welcome to your centralized, admin-free Content Management System.

With this architecture, you never have to edit JSX components, style sheets, or page layouts just to change your portfolio content. All data is managed through structured configuration files located in `src/data/`, and all personal media assets live in `public/assets/`.

---

## Centralized Architecture Overview

```text
src/
└── data/
    ├── portfolioData.js     # Master entry point consolidating all data sources
    ├── personalData.js      # Name, titles, hero section, introductions, timeline, and resume info
    ├── educationData.js     # College degrees, branches, dates, descriptions, and certificates
    ├── skillsData.js        # Technical skills, categories, icons, and learning goals
    ├── projectsData.js      # Portfolio projects, tech stacks, screenshots, and URLs
    ├── contactData.js       # Email, phone, location, and contact form configuration
    └── socialLinks.js       # GitHub, LinkedIn, Instagram, and other social media profiles

public/
└── assets/
    ├── images/
    │   ├── profile/         # Profile photo and About page photo
    │   ├── projects/        # Project screenshots
    │   └── certificates/    # Certificate images and documents
    └── documents/
        └── resume/          # Resume PDF file
```

---

## 1. How to Update Your Name

**File:** `src/data/personalData.js`

Open `src/data/personalData.js` and edit the `fullName` and `shortName` fields:

```javascript
// UPDATE YOUR FULL NAME HERE
fullName: "Shankar Chaudhary",

// UPDATE YOUR SHORT NAME OR NICKNAME HERE
shortName: "Shankar",
```

> **Where it updates automatically:**
> - Top Navigation Bar logo / brand title
> - Browser document title in tab (`App.jsx`)
> - Hero greeting on the Home page
> - Footer brand & copyright notice
> - About Me card headers

---

## 2. How to Change Your Profile Photo

**Image Path:** `public/assets/images/profile/profile-photo.jpg`  
**Configuration File:** `src/data/personalData.js`

1. Save your photograph into `public/assets/images/profile/` (e.g. `profile-photo.jpg`).
2. Open `src/data/personalData.js` and set `profileImageUploaded: true`:

```javascript
// REPLACE YOUR PROFILE PHOTO HERE
profileImage: "/assets/images/profile/profile-photo.jpg",
profileImageUploaded: true,
```

> **Fallback Protection:** If you haven't uploaded an image yet or `profileImageUploaded` is `false`, a professional developer placeholder card is displayed automatically—preventing broken images.

For the **About Me page photo**, place your image in `public/assets/images/profile/about-photo.jpg` and set `aboutImageUploaded: true` in `src/data/personalData.js`.

---

## 3. How to Update Your Introduction

**File:** `src/data/personalData.js`

You can update your hero headlines and narrative introductions in `src/data/personalData.js`:

```javascript
// HERO HEADING & SUBTITLE
heroHeading: "Building Digital Experiences Through Code.",
heroSubtitle: "Crafting modern, accessible web applications and reliable software solutions.",

// SHORT INTRODUCTION (Home & Footer)
introduction: "I am a passionate developer who enjoys building modern websites...",

// EXTENDED ABOUT DESCRIPTION (About page)
aboutDescription: "Hello! I'm Shankar Chaudhary, an aspiring Software Developer...",

// DEVELOPER JOURNEY (About page)
developerJourney: "My journey in programming started with core languages like C and C++...",
```

---

## 4. How to Add a New Skill

**File:** `src/data/skillsData.js`

1. Locate the appropriate category inside `skillsCategories` (`languages`, `frontend`, `backend`, `databases`, or `tools`).
2. Add a new skill object to its `items` array:

```javascript
{
  id: "docker",
  name: "Docker",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  category: "Developer Tools",
  description: "Containerization, Dockerfiles, multi-stage builds, and container networking.",
  featured: true,  // Set true to also display on the Home page featured skills grid
  visible: true    // Set true to display
}
```

Both the **Skills page** and the **Home page** (if `featured: true`) will display the new skill immediately without any changes to React components.

---

## 5. How to Remove or Hide a Skill

**File:** `src/data/skillsData.js`

You have two options:
- **Temporary Hide (Recommended):** Change `visible: true` to `visible: false`:
  ```javascript
  {
    id: "mariadb",
    name: "MariaDB",
    ...
    visible: false // Hides skill completely from the site
  }
  ```
- **Permanent Removal:** Delete the skill object from the `items` array.

---

## 6. How to Add a New Project

**File:** `src/data/projectsData.js`

1. Place your project screenshot in `public/assets/images/projects/` (e.g. `my-project.jpg`).
2. Open `src/data/projectsData.js` and append a new project object to the array:

```javascript
{
  id: "task-tracker",
  number: "04",
  title: "DevSprint Task Tracker",
  category: "Full Stack • React & Node.js",
  description: "A collaborative Kanban task and sprint tracking web application.",
  detailedDescription: "A full-stack project management application with drag-and-drop task boards, milestone tracking, and user authentication.",
  highlights: [
    "Interactive drag-and-drop board powered by React",
    "RESTful API backend built with Express.js",
    "PostgreSQL database integration with automated schema migrations"
  ],
  technologies: ["React", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
  image: "/assets/images/projects/my-project.jpg",
  imageUploaded: true,
  github: "https://github.com/shankarchaudhary/task-tracker",
  liveDemo: "https://tasktracker-demo.example.com",
  featured: true, // Display on Homepage
  visible: true   // Make visible on Projects page
}
```

The card, technology badges, highlights, screenshot, and action buttons generate dynamically.

---

## 7. How to Remove or Hide a Project

**File:** `src/data/projectsData.js`

- **To temporarily hide:** Set `visible: false` on the project object.
- **To un-feature from Home:** Set `featured: false`.
- **To permanently delete:** Remove the project object from the array.

---

## 8. How to Update GitHub and Live Demo Links

**File:** `src/data/projectsData.js`

Inside each project in `projectsData`:

```javascript
// Real clickable links (must start with https:// or http://):
github: "https://github.com/shankarchaudhary/smart-lms",
liveDemo: "https://smart-lms-demo.vercel.app",
```

> **Safe Link Handling:**
> - Placeholders starting with `//` or empty strings `""` are **never rendered as broken links**.
> - Empty links automatically hide the corresponding action button.
> - Valid `http://` or `https://` URLs automatically open in a secure new tab (`target="_blank" rel="noopener noreferrer"`).

---

## 9. How to Update Education Details

**File:** `src/data/educationData.js`

Edit the `educationList` array in `src/data/educationData.js`:

```javascript
export const educationList = [
  {
    id: "btech-degree",
    institution: "XYZ University / College Name",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science & Engineering",
    startYear: "2022",
    endYear: "2026",
    dates: "2022 - 2026",
    currentYearOrSemester: "3rd Year (6th Semester)",
    location: "India",
    description: "Focusing on software development, algorithmic problem solving, object-oriented design in Java, and modern full-stack web applications.",
    logo: "", // Optional: "/assets/images/education/college-logo.png"
    visible: true
  }
];
```

You can add multiple degree or diploma objects to `educationList`; the About page will render each record in sequence.

---

## 10. How to Upload Certificates

**File:** `src/data/educationData.js`  
**Image Path:** `public/assets/images/certificates/`

1. Place your certificate image or PDF in `public/assets/images/certificates/` (e.g. `aws-cert.jpg`).
2. Open `src/data/educationData.js` and add an entry into `certificatesList`:

```javascript
export const certificatesList = [
  {
    id: "cert-aws",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "/assets/images/certificates/aws-cert.jpg",
    issueDate: "2025",
    credentialUrl: "https://aws.amazon.com/verification/12345",
    visible: true
  }
];
```

If `certificatesList` is empty, the About page gracefully displays the clean certificate placeholder notice without displaying unverified or fake credentials.

---

## 11. How to Update Email and Social Links

**Files:** `src/data/contactData.js` and `src/data/socialLinks.js`

### Contact Details (`src/data/contactData.js`):
```javascript
// UPDATE EMAIL
email: "shankar@example.com",

// UPDATE PHONE (Leave empty "" to hide)
phone: "+91 98765 43210",

// UPDATE LOCATION
location: "India",
locationDisplay: "New Delhi, India",
```

### Social Links (`src/data/socialLinks.js`):
```javascript
// UPDATE GITHUB URL
github: "https://github.com/shankarchaudhary",

// UPDATE LINKEDIN URL
linkedin: "https://linkedin.com/in/shankarchaudhary",

// UPDATE INSTAGRAM (Optional - leave empty "" to hide)
instagram: "",

// UPDATE TWITTER / X (Optional - leave empty "" to hide)
twitter: "",
```

> **Automatic Element Hiding:** If any profile is empty (`""`), its icons and rows are automatically hidden on the Contact page, Footer, and Navigation bar.

---

## 12. How to Replace Your Resume PDF

**PDF File Path:** `public/assets/documents/resume/Shankar_Chaudhary_Resume.pdf`  
**Configuration File:** `src/data/personalData.js`

1. Place your compiled resume PDF into `public/assets/documents/resume/Shankar_Chaudhary_Resume.pdf`.
2. Open `src/data/personalData.js` and enable `isUploaded`:

```javascript
resume: {
  filePath: "/assets/documents/resume/Shankar_Chaudhary_Resume.pdf",
  fileName: "Shankar_Chaudhary_Resume.pdf",
  isUploaded: true, // Activates direct downloads
}
```

> **Missing Resume Protection:** When `isUploaded: false` or if the file path is empty, the download button is completely hidden from the Navbar, Hero section, and About page to prevent broken download links.

---

## Quick Testing & Build Verification

After updating any data file, you can preview and verify your build locally:

```bash
# Start local development server
npm run dev

# Run production build check
npm run build
```

