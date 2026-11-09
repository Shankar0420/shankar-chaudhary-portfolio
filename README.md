# Shankar Chaudhary — Personal Developer Portfolio Website

A complete, 5-page dark-themed personal developer portfolio built with **React**, **Vite**, **Tailwind CSS**, **React Router**, and **Lucide React Icons**.

## 1. Folder Structure

```text
shankar-chaudhary-portfolio/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── profile/        # // UPLOAD YOUR PROFILE PHOTO & ABOUT PHOTO HERE
│       │   ├── projects/       # // UPLOAD YOUR PROJECT SCREENSHOTS HERE
│       │   └── certificates/   # // ADD YOUR CERTIFICATE IMAGE HERE
│       └── documents/
│           └── resume/         # // UPLOAD YOUR RESUME PDF HERE
├── src/
│   ├── components/
│   │   ├── AssetPlaceholder.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ResumeButton.jsx
│   ├── data/
│   │   └── portfolioData.js    # Centralized configuration for all 5 pages
│   ├── pages/
│   │   ├── Home.jsx            # Page 1: Home
│   │   ├── About.jsx           # Page 2: About Me
│   │   ├── Skills.jsx          # Page 3: Skills & Technologies
│   │   ├── Projects.jsx        # Page 4: Projects Showcase
│   │   └── Contact.jsx         # Page 5: Contact Me
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 2. How to Run Locally

1. Ensure **Node.js** (v18+ recommended) is installed on your machine.
2. Extract this project folder and open a terminal inside it:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local development URL printed in your terminal (typically `http://localhost:5173`).
4. To create a production build:
   ```bash
   npm run build
   npm run preview
   ```

## 3. Files & Images to Upload

Place your personal files into the corresponding `public/assets/` folders and flip the boolean flag in `src/data/portfolioData.js`:

1. **Homepage Profile Photo** (`// UPLOAD YOUR PROFILE PHOTO HERE`)
   - Path: `public/assets/images/profile/profile-photo.jpg`
   - In `src/data/portfolioData.js`: set `personalInfo.profilePhotoUploaded = true`
2. **About Page Photo** (`// UPLOAD YOUR ABOUT PAGE PHOTO HERE`)
   - Path: `public/assets/images/profile/about-photo.jpg`
   - In `src/data/portfolioData.js`: set `personalInfo.aboutPhotoUploaded = true`
3. **Project 1 Screenshot — Smart LMS** (`// UPLOAD LMS PROJECT SCREENSHOT HERE`)
   - Path: `public/assets/images/projects/lms-screenshot.jpg`
   - In `src/data/portfolioData.js`: set `imageUploaded: true` on Project 1
4. **Project 2 Screenshot — Cafe and Hotel Haven** (`// UPLOAD CAFE PROJECT SCREENSHOT HERE`)
   - Path: `public/assets/images/projects/cafe-screenshot.jpg`
   - In `src/data/portfolioData.js`: set `imageUploaded: true` on Project 2
5. **Project 3 Screenshot — KUNJ'S PG HOUSE** (`// UPLOAD PG WEBSITE SCREENSHOT HERE`)
   - Path: `public/assets/images/projects/pg-screenshot.jpg`
   - In `src/data/portfolioData.js`: set `imageUploaded: true` on Project 3
6. **Project 4 Screenshot — Future Project** (`// UPLOAD PROJECT IMAGE HERE`)
   - Path: `public/assets/images/projects/future-project.jpg`
   - In `src/data/portfolioData.js`: set `imageUploaded: true` on Project 4
7. **Resume / CV PDF** (`// UPLOAD YOUR RESUME PDF HERE`)
   - Path: `public/assets/documents/resume/Shankar_Chaudhary_Resume.pdf`
   - In `src/data/portfolioData.js`: set `resumeConfig.isUploaded = true`
8. **Optional Certificates** (`// ADD YOUR CERTIFICATE IMAGE HERE`)
   - Path: `public/assets/images/certificates/`

## 4. Personal Details to Replace in `src/data/portfolioData.js`

Search for `// ADD` in `src/data/portfolioData.js` to replace:
- `personalInfo.university` (`// ADD UNIVERSITY NAME`)
- `aboutData.educationDetails.institution` (`// ADD COLLEGE OR UNIVERSITY NAME`)
- `aboutData.educationDetails.courseAndBranch` (`// ADD COURSE AND BRANCH`)
- `aboutData.educationDetails.currentYearOrSemester` (`// ADD CURRENT YEAR OR SEMESTER`)
- `aboutData.educationDetails.dates` (`// ADD EDUCATION DATES`)
- Each project's `githubUrl` and `liveUrl` (`// ADD ... GITHUB ... HERE`, `// ADD ... LIVE ... HERE`)
- `contactInfo.email` (`// ADD YOUR EMAIL ADDRESS HERE`)
- `contactInfo.github` (`// ADD YOUR GITHUB PROFILE LINK HERE`)
- `contactInfo.linkedin` (`// ADD YOUR LINKEDIN PROFILE LINK HERE`)
- `contactInfo.location` (`// ADD YOUR LOCATION HERE`)
- `contactInfo.formEndpoint` (`// ADD YOUR CONTACT FORM API ENDPOINT HERE`) and set `endpointConfigured: true`

## 5. How to Update or Add Projects in the Future

Open `src/data/portfolioData.js` and locate `export const projectsData = [...]`.
You can edit Project 4 (`id: "future-project-placeholder"`) or add a new object:

```js
{
  id: "my-new-project",
  number: "05",
  title: "Your Project Title",
  category: "Full Stack Application",
  featured: true, // true shows it on the Home page as well
  isPlaceholder: false,
  description: "Concise description of what your project solves and how it works.",
  highlights: [
    "Key feature 1",
    "Key feature 2"
  ],
  technologies: ["React", "Tailwind CSS", "Spring Boot", "MySQL"],
  image: "/assets/images/projects/my-new-project.jpg",
  imageUploaded: true,
  imagePlaceholderComment: "// UPLOAD PROJECT IMAGE HERE",
  githubUrl: "https://github.com/yourusername/your-repo",
  liveUrl: "https://your-live-demo.com"
}
```
