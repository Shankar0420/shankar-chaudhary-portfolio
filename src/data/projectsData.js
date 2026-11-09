// ============================================================================
// PROJECTS DATA CONFIGURATION
// To add a new project: simply add a new object to this array.
// To hide a project: set `visible: false`.
// To feature a project on the Home page: set `featured: true`.
//
// Each project supports:
// - id: Unique string or number
// - number: Sequential display badge (e.g. "01")
// - title: Project name
// - category: Project type/category
// - description: Short project summary
// - detailedDescription: Detailed description or overview
// - highlights: Bullet points of key features
// - technologies: Array of technology names
// - image: Path to screenshot in public/assets/images/projects/
// - imageUploaded: boolean (set to true once image file is in public/)
// - github: GitHub repository URL (or githubUrl)
// - liveDemo: Live demo URL (or liveUrl)
// - featured: boolean (true to display in Home page featured section)
// - visible: boolean (true to display, false to hide completely)
// ============================================================================

const projectsData = [
  {
    id: "smart-lms",
    number: "01",
    title: "Smart Learning Management System (LMS)",
    category: "Full Stack • Java Spring Boot",
    description:
      "A learning management platform designed to manage students, teachers, courses, quizzes, and academic activities.",
    detailedDescription:
      "A complete learning management platform designed to manage students, teachers, courses, quizzes, and academic activities with role-based access control and persistent relational storage.",
    highlights: [
      "Role-based academic workflows for students and instructors",
      "Course catalog, quiz management, and academic activity tracking",
      "Relational persistence powered by Java Spring Boot and MariaDB"
    ],
    technologies: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript", "MariaDB"],

    // UPLOAD LMS PROJECT SCREENSHOT HERE
    // Place image in: public/assets/images/projects/lms-screenshot.jpg
    image: "/assets/images/projects/lms-screenshot.jpg",
    imageUploaded: false,
    imagePlaceholderComment: "// UPLOAD LMS PROJECT SCREENSHOT HERE (public/assets/images/projects/lms-screenshot.jpg)",

    // ADD LMS GITHUB REPOSITORY LINK HERE
    github: "// ADD LMS GITHUB REPOSITORY LINK HERE",
    githubUrl: "// ADD LMS GITHUB REPOSITORY LINK HERE",

    // ADD LMS LIVE WEBSITE LINK HERE
    liveDemo: "// ADD LMS LIVE WEBSITE LINK HERE",
    liveUrl: "// ADD LMS LIVE WEBSITE LINK HERE",

    featured: true,
    visible: true
  },
  {
    id: "cafe-hotel-haven",
    number: "02",
    title: "Cafe and Hotel Haven",
    category: "Full Stack • Node.js & Express",
    description:
      "A cafe and hotel management website with frontend and backend integration.",
    detailedDescription:
      "A full-featured cafe and hotel management website featuring interactive dining and accommodation views connected to a Node.js and Express backend with MySQL persistence.",
    highlights: [
      "Interactive hospitality interface showcasing dining and room offerings",
      "Backend server integration built with Node.js and Express.js",
      "Structured MySQL database storage for management operations"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],

    // UPLOAD CAFE PROJECT SCREENSHOT HERE
    // Place image in: public/assets/images/projects/cafe-screenshot.jpg
    image: "/assets/images/projects/cafe-screenshot.jpg",
    imageUploaded: false,
    imagePlaceholderComment: "// UPLOAD CAFE PROJECT SCREENSHOT HERE (public/assets/images/projects/cafe-screenshot.jpg)",

    // ADD CAFE GITHUB LINK HERE
    github: "// ADD CAFE GITHUB LINK HERE",
    githubUrl: "// ADD CAFE GITHUB LINK HERE",

    // ADD CAFE LIVE WEBSITE LINK HERE
    liveDemo: "// ADD CAFE LIVE WEBSITE LINK HERE",
    liveUrl: "// ADD CAFE LIVE WEBSITE LINK HERE",

    featured: true,
    visible: true
  },
  {
    id: "kunjs-pg-house",
    number: "03",
    title: "KUNJ'S PG HOUSE",
    category: "Frontend Web Application",
    description:
      "A responsive PG accommodation website designed to display rooms, facilities, pricing, and booking information.",
    detailedDescription:
      "A responsive PG accommodation website crafted for prospective residents to view room categories, amenities, pricing plans, and booking procedures with interactive client-side logic.",
    highlights: [
      "Clean, mobile-friendly presentation of room categories and amenities",
      "Transparent pricing tiers and structured booking inquiry information",
      "Built with semantic HTML, modern CSS layouts, and interactive JavaScript"
    ],
    technologies: ["HTML", "CSS", "JavaScript"],

    // UPLOAD PG WEBSITE SCREENSHOT HERE
    // Place image in: public/assets/images/projects/pg-screenshot.jpg
    image: "/assets/images/projects/pg-screenshot.jpg",
    imageUploaded: false,
    imagePlaceholderComment: "// UPLOAD PG WEBSITE SCREENSHOT HERE (public/assets/images/projects/pg-screenshot.jpg)",

    // ADD PG GITHUB LINK HERE
    github: "// ADD PG GITHUB LINK HERE",
    githubUrl: "// ADD PG GITHUB LINK HERE",

    // ADD PG LIVE WEBSITE LINK HERE
    liveDemo: "// ADD PG LIVE WEBSITE LINK HERE",
    liveUrl: "// ADD PG LIVE WEBSITE LINK HERE",

    featured: true,
    visible: true
  },
  {
    id: "upcoming-project-template",
    number: "04",
    // ADD PROJECT TITLE HERE
    title: "// ADD PROJECT TITLE HERE",
    category: "Upcoming Project Slot",
    description: "// ADD PROJECT DESCRIPTION HERE",
    detailedDescription: "Template project slot ready to be customized in src/data/projectsData.js.",
    highlights: [
      "Ready-to-edit template card inside src/data/projectsData.js",
      "Replace title, description, technologies, screenshot, and links anytime"
    ],
    technologies: ["React", "Tailwind CSS"],
    image: "/assets/images/projects/future-project.jpg",
    imageUploaded: false,
    imagePlaceholderComment: "// UPLOAD PROJECT IMAGE HERE (public/assets/images/projects/future-project.jpg)",
    github: "// ADD GITHUB LINK HERE",
    githubUrl: "// ADD GITHUB LINK HERE",
    liveDemo: "// ADD LIVE DEMO LINK HERE",
    liveUrl: "// ADD LIVE DEMO LINK HERE",
    featured: false,
    // Set visible: false so templates or unpublished projects do NOT appear on the site
    visible: false
  }
];

export default projectsData;

