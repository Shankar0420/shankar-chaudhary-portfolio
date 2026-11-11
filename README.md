# Shankar Kumar Chaudhary — Personal Developer Portfolio

A professional, fully static, code-controlled personal developer portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **React Router**.

- **Live URL:** [https://shankar-chaudhary-portfolio-site.onrender.com](https://shankar-chaudhary-portfolio-site.onrender.com)
- **Developer:** Shankar Kumar Chaudhary
- **Role:** Full Stack Developer
- **Education:** Galgotias University (B.Tech in Computer Science and Engineering)

---

## Architecture Overview

Everything displayed on the public portfolio is permanently controlled through source code and static assets. There are no external CMS or admin database dependencies.

```text
shankar-chaudhary-portfolio/
├── public/
│   ├── _redirects                     # SPA rewrite rule for Render static hosting
│   └── assets/
│       ├── images/
│       │   ├── profile/
│       │   │   ├── profile-photo.jpg  # Homepage profile photo
│       │   │   └── about-photo.jpg    # About page photo
│       │   └── projects/
│       │       ├── lms-screenshot.jpg # Galgotias LMS screenshot
│       │       └── pg-screenshot.jpg  # KUNJ'S PG HOUSE screenshot
│       └── documents/
│           └── resume/
│               └── Shankar_Chaudhary_Resume.pdf
├── src/
│   ├── components/
│   │   ├── AssetPlaceholder.jsx       # Static image and CSS placeholder component
│   │   ├── Footer.jsx                 # Global footer with functional contact links
│   │   ├── Navbar.jsx                 # Global responsive navigation
│   │   └── ResumeButton.jsx           # Direct resume download & view component
│   ├── context/
│   │   └── PortfolioContext.jsx       # Static synchronous data provider
│   ├── data/
│   │   ├── portfolioData.js           # Master consolidated configuration
│   │   ├── personalData.js            # Bio, introduction, titles, and photos
│   │   ├── educationData.js           # Academic qualifications & background
│   │   ├── skillsData.js              # Technical skills by category & icons
│   │   ├── projectsData.js            # Featured projects, highlights, & tech stacks
│   │   ├── contactData.js             # Email, phone, location, and contact details
│   │   └── socialLinks.js             # LinkedIn, GitHub, and portfolio links
│   ├── pages/
│   │   ├── Home.jsx                   # Page 1: Hero, bio, featured skills, and projects
│   │   ├── About.jsx                  # Page 2: Detailed bio, journey, and education
│   │   ├── Skills.jsx                 # Page 3: Categorized technical skills & tools
│   │   ├── Projects.jsx               # Page 4: Full project portfolio showcase
│   │   ├── Contact.jsx                # Page 5: Direct communication & message composer
│   │   └── NotFound.jsx               # Custom 404 page
│   ├── App.jsx                        # Client router & page title manager
│   ├── index.css                      # Global styles and design system
│   └── main.jsx                       # React DOM entry point
├── index.html                         # Semantic HTML5, Open Graph, and SEO metadata
├── package.json
└── vite.config.js
```

---

## Local Development & Production Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```
The production bundle is output to `dist/`.

---

## Deployment on Render

This portfolio is configured for zero-configuration static site deployment on **Render**:
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- Direct routing to `/about`, `/projects`, `/skills`, `/contact` is supported via `public/_redirects`.
