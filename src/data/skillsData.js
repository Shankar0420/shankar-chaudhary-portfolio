// ============================================================================
// SKILLS & TECHNOLOGIES CONFIGURATION
// Add, edit, or remove skills and categories here.
// Each skill supports: name, icon, category, description, featured, and visible.
// Set `visible: false` to hide any skill without deleting its record.
// ============================================================================

export const skillsCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core languages used for problem solving, OOP, and application logic",
    accent: "from-purple-500/20 to-indigo-500/20",
    borderAccent: "hover:border-purple-500/50",
    items: [
      {
        id: "c",
        name: "C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        category: "Programming Languages",
        description: "Procedural programming, memory concepts, control structures, and foundational algorithmic problem solving.",
        featured: false,
        visible: true
      },
      {
        id: "cpp",
        name: "C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        category: "Programming Languages",
        description: "Object-oriented programming, standard template library (STL) fundamentals, and structured data logic.",
        featured: false,
        visible: true
      },
      {
        id: "java",
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        category: "Programming Languages",
        description: "Object-oriented design, collections framework, and enterprise backend application development.",
        featured: true,
        visible: true
      },
      {
        id: "javascript",
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        category: "Programming Languages",
        description: "Asynchronous programming, ES6+ syntax, DOM manipulation, and full-stack web interactivity.",
        featured: true,
        visible: true
      }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Technologies for crafting responsive, accessible, and modern user interfaces",
    accent: "from-cyan-500/20 to-blue-500/20",
    borderAccent: "hover:border-cyan-500/50",
    items: [
      {
        id: "html",
        name: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        category: "Frontend Development",
        description: "Semantic document structure, accessible forms, and SEO-aware page layouts.",
        featured: false,
        visible: true
      },
      {
        id: "css",
        name: "CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        category: "Frontend Development",
        description: "Responsive Flexbox and Grid layouts, custom animations, and modular styling.",
        featured: false,
        visible: true
      },
      {
        id: "react",
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        category: "Frontend Development",
        description: "Component-based UI architecture, hooks, state management, and single-page routing.",
        featured: true,
        visible: true
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        category: "Frontend Development",
        description: "Utility-first responsive styling, dark-theme design systems, and consistent spacing scales.",
        featured: true,
        visible: true
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Server-side frameworks and runtimes for APIs and business logic",
    accent: "from-blue-500/20 to-purple-500/20",
    borderAccent: "hover:border-blue-500/50",
    items: [
      {
        id: "spring-boot",
        name: "Java Spring Boot",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        category: "Backend Development",
        description: "Building structured Java backend services, MVC controllers, and database-backed web platforms.",
        featured: true,
        visible: true
      },
      {
        id: "nodejs",
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        category: "Backend Development",
        description: "Event-driven JavaScript runtime for building scalable server-side applications.",
        featured: true,
        visible: true
      },
      {
        id: "express",
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        category: "Backend Development",
        description: "Lightweight routing, middleware pipelines, and REST API endpoints for full-stack apps.",
        featured: false,
        visible: true
      }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Relational database management systems for structured data persistence",
    accent: "from-indigo-500/20 to-cyan-500/20",
    borderAccent: "hover:border-indigo-500/50",
    items: [
      {
        id: "mysql",
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        category: "Databases",
        description: "Relational schema modeling, SQL queries, joins, and persistent storage for web backends.",
        featured: true,
        visible: true
      },
      {
        id: "mariadb",
        name: "MariaDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg",
        category: "Databases",
        description: "Open-source relational database integration used with Java Spring Boot applications.",
        featured: false,
        visible: true
      }
    ]
  },
  {
    id: "tools",
    title: "Developer Tools",
    subtitle: "Version control and integrated development environments",
    accent: "from-purple-500/20 to-cyan-500/20",
    borderAccent: "hover:border-purple-400/50",
    items: [
      {
        id: "git",
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        category: "Developer Tools",
        description: "Distributed version control, branching workflows, and tracking code history.",
        featured: false,
        visible: true
      },
      {
        id: "github",
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        category: "Developer Tools",
        description: "Code hosting, repository management, project documentation, and collaboration.",
        featured: true,
        visible: true
      },
      {
        id: "vscode",
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        category: "Developer Tools",
        description: "Primary code editor for frontend, React, Node.js, and full-stack web workflows.",
        featured: false,
        visible: true
      },
      {
        id: "intellij",
        name: "IntelliJ IDEA",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
        iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
        category: "Developer Tools",
        description: "Dedicated IDE for Java programming and Spring Boot application development.",
        featured: false,
        visible: true
      }
    ]
  }
];

export const learningInterests = [
  {
    title: "RESTful API Design & Security",
    description: "Exploring clean authentication flows, validation layers, and structured API documentation across Spring Boot and Express.js."
  },
  {
    title: "Modern React Patterns",
    description: "Improving component reusability, state organization, accessible UI patterns, and responsive design systems."
  },
  {
    title: "Database Optimization",
    description: "Learning indexing basics, query efficiency, and clean relational modeling in MySQL and MariaDB."
  },
  {
    title: "Data Structures & Algorithms",
    description: "Practicing problem-solving techniques in C, C++, and Java to write cleaner and more efficient code."
  }
];

const skillsData = {
  categories: skillsCategories,
  learningInterests: learningInterests
};

export default skillsData;

