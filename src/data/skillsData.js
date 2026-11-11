// ============================================================================
// SKILLS & TECHNOLOGIES CONFIGURATION (CODE-CONTROLLED)
// Master technical skill set for Shankar Kumar Chaudhary
// ============================================================================

export const skillsCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core languages used for algorithmic problem solving, OOP, and web logic",
    accent: "from-purple-500/20 to-indigo-500/20",
    borderAccent: "hover:border-purple-500/50",
    items: [
      {
        id: "c",
        name: "C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        category: "Programming Languages",
        description: "Procedural programming, pointers, memory concepts, control structures, and foundational algorithms.",
        featured: false,
        visible: true
      },
      {
        id: "cpp",
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        category: "Programming Languages",
        description: "Object-oriented programming, standard template library (STL) basics, and structured problem solving.",
        featured: false,
        visible: true
      },
      {
        id: "java",
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        category: "Programming Languages",
        description: "Object-oriented design, collections framework, exception handling, and enterprise backend logic.",
        featured: true,
        visible: true
      },
      {
        id: "javascript",
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        category: "Programming Languages",
        description: "ES6+ syntax, asynchronous programming (Promises/async-await), DOM manipulation, and interactive web apps.",
        featured: true,
        visible: true
      }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Modern, responsive, and accessible client-side interfaces",
    accent: "from-cyan-500/20 to-blue-500/20",
    borderAccent: "hover:border-cyan-500/50",
    items: [
      {
        id: "html",
        name: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        category: "Frontend Development",
        description: "Semantic document structure, accessible form validation, and SEO-friendly web standards.",
        featured: false,
        visible: true
      },
      {
        id: "css",
        name: "CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        category: "Frontend Development",
        description: "Responsive layouts with Flexbox and CSS Grid, transitions, animations, and clean visual styling.",
        featured: false,
        visible: true
      },
      {
        id: "react",
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        category: "Frontend Development",
        description: "Reusable component architecture, React hooks, state management, SPA routing, and client performance.",
        featured: true,
        visible: true
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        category: "Frontend Development",
        description: "Utility-first responsive styling, custom design tokens, dark theme integration, and clean layouts.",
        featured: true,
        visible: true
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Server-side frameworks, application architecture, and robust RESTful APIs",
    accent: "from-blue-500/20 to-purple-500/20",
    borderAccent: "hover:border-blue-500/50",
    items: [
      {
        id: "java-spring",
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        category: "Backend Development",
        description: "Enterprise backend development, robust multi-tier architecture, and data structures.",
        featured: false,
        visible: true
      },
      {
        id: "spring-boot",
        name: "Spring Boot",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        category: "Backend Development",
        description: "Production-ready Java services, Spring Data JPA, MVC architecture, and embedded server configuration.",
        featured: true,
        visible: true
      },
      {
        id: "spring-security",
        name: "Spring Security",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        category: "Backend Development",
        description: "Authentication filters, authorization policies, CORS configuration, and security headers.",
        featured: false,
        visible: true
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        category: "Backend Development",
        description: "Clean HTTP endpoints, CRUD operations, JSON request/response formats, and status codes.",
        featured: true,
        visible: true
      },
      {
        id: "nodejs",
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        category: "Backend Development",
        description: "Event-driven JavaScript runtime for building scalable server-side tools and microservices.",
        featured: true,
        visible: true
      },
      {
        id: "express",
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        category: "Backend Development",
        description: "Lightweight routing, custom middleware pipelines, and API controller integration.",
        featured: false,
        visible: true
      }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Relational and document storage systems for persistent data management",
    accent: "from-indigo-500/20 to-cyan-500/20",
    borderAccent: "hover:border-indigo-500/50",
    items: [
      {
        id: "mysql",
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        category: "Databases",
        description: "Relational schema design, SQL queries, table normalization, and foreign key relations.",
        featured: true,
        visible: true
      },
      {
        id: "mariadb",
        name: "MariaDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
        category: "Databases",
        description: "Open-source relational database persistence powering Spring Boot enterprise applications.",
        featured: false,
        visible: true
      },
      {
        id: "mongodb",
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        category: "Databases",
        description: "NoSQL document storage, flexible schema handling, and JSON-like collection operations.",
        featured: false,
        visible: true
      }
    ]
  },
  {
    id: "tools",
    title: "Tools and Technologies",
    subtitle: "Version control, build automation, API testing, and deployment platforms",
    accent: "from-purple-500/20 to-cyan-500/20",
    borderAccent: "hover:border-purple-400/50",
    items: [
      {
        id: "git",
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        category: "Tools and Technologies",
        description: "Distributed version control, branching, committing, merging, and revision history tracking.",
        featured: false,
        visible: true
      },
      {
        id: "github",
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        category: "Tools and Technologies",
        description: "Remote repositories, code reviews, deployment triggers, and open-source collaboration.",
        featured: true,
        visible: true
      },
      {
        id: "vscode",
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        category: "Tools and Technologies",
        description: "Primary development environment with custom linting, debugging, and terminal workflows.",
        featured: false,
        visible: true
      },
      {
        id: "maven",
        name: "Maven",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",
        category: "Tools and Technologies",
        description: "Java build automation, dependency resolution, packaging, and testing workflows.",
        featured: false,
        visible: true
      },
      {
        id: "postman",
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
        category: "Tools and Technologies",
        description: "API testing, inspecting HTTP payloads, header verification, and request debugging.",
        featured: false,
        visible: true
      },
      {
        id: "netlify",
        name: "Netlify",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg",
        category: "Tools and Technologies",
        description: "Static web deployment, continuous integration from Git, and custom routing configurations.",
        featured: false,
        visible: true
      },
      {
        id: "render",
        name: "Render",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/render/render-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/render/render-original.svg",
        category: "Tools and Technologies",
        description: "Cloud hosting for static web frontends and containerized web application services.",
        featured: true,
        visible: true
      }
    ]
  },
  {
    id: "ai-development",
    title: "AI-Assisted Development",
    subtitle: "Modern workflows leveraging AI tooling to accelerate learning and delivery",
    accent: "from-cyan-500/20 to-purple-500/20",
    borderAccent: "hover:border-cyan-400/50",
    items: [
      {
        id: "ai-assisted-workflow",
        name: "AI-Assisted Development",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
        category: "AI-Assisted Development",
        description:
          "Experience using AI development tools to understand programming concepts, explore solutions, debug errors, improve code quality, and accelerate development while continuously learning and strengthening independent programming skills.",
        featured: true,
        visible: true
      }
    ]
  }
];

export const learningInterests = [
  {
    title: "Full-Stack System Architecture",
    description: "Deepening knowledge of scalable multi-tier web applications connecting React frontends with Spring Boot and Node.js backends."
  },
  {
    title: "RESTful API Security & Best Practices",
    description: "Designing clean API contracts, robust validation, structured error responses, and defense-in-depth security."
  },
  {
    title: "Database Modeling & Performance",
    description: "Practicing query optimization, schema indexing, and reliable persistence across MySQL and MariaDB."
  },
  {
    title: "Algorithmic Problem Solving",
    description: "Strengthening core computer science problem-solving capabilities in C, C++, and Java."
  }
];

const skillsData = {
  categories: skillsCategories,
  learningInterests: learningInterests
};

export default skillsData;
