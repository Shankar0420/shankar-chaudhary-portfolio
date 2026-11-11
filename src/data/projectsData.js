// ============================================================================
// PROJECTS CONFIGURATION (CODE-CONTROLLED)
// Featured software & web development projects for Shankar Kumar Chaudhary
// ============================================================================

const projectsData = [
  {
    id: "galgotias-lms",
    number: "01",
    title: "Galgotias LMS",
    category: "Full Stack • Java Spring Boot",
    description:
      "A complete learning management platform designed to manage students, teachers, courses, quizzes, and academic activities.",
    detailedDescription:
      "A complete learning management platform engineered to manage students, teachers, courses, quizzes, and academic workflows with structured role-based access control and persistent relational storage.",
    highlights: [
      "Role-based academic workflows for students, instructors, and department administrators",
      "Course catalog, student enrollment, quiz management, and grade tracking",
      "Persistent backend services powered by Java Spring Boot with MariaDB relational storage"
    ],
    technologies: ["Java", "Spring Boot", "HTML", "CSS", "JavaScript", "MariaDB"],
    image: "/assets/images/projects/lms-screenshot.jpg",
    imageUploaded: true,
    hasCustomImage: true,
    github: "",
    githubUrl: "",
    liveDemo: "",
    liveUrl: "",
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
      "Interactive hospitality interface showcasing dining menus, reservations, and room offerings",
      "Backend server integration built with Node.js and Express.js REST endpoints",
      "Structured MySQL database schema for managing customer inquiries and bookings"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
    // No screenshot uploaded; handled via CSS-based professional architecture placeholder
    image: null,
    imageUploaded: false,
    hasCustomImage: false,
    github: "",
    githubUrl: "",
    liveDemo: "",
    liveUrl: "",
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
      "A responsive PG accommodation website crafted for prospective residents to view room categories, amenities, transparent pricing tiers, and booking procedures with interactive client-side logic.",
    highlights: [
      "Clean, mobile-first presentation of room categories, amenities, and hostel rules",
      "Transparent pricing tiers and structured booking inquiry contact information",
      "Built with semantic HTML, modern responsive CSS layouts, and interactive JavaScript"
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/assets/images/projects/pg-screenshot.jpg",
    imageUploaded: true,
    hasCustomImage: true,
    github: "",
    githubUrl: "",
    liveDemo: "",
    liveUrl: "",
    featured: true,
    visible: true
  }
];

export default projectsData;
