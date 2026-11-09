package com.shankarchaudhary.portfolio.config;

import com.shankarchaudhary.portfolio.entity.*;
import com.shankarchaudhary.portfolio.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProfileRepository profileRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;

    public DataInitializer(
            ProfileRepository profileRepository,
            EducationRepository educationRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ContactInfoRepository contactInfoRepository,
            WebsiteSettingsRepository websiteSettingsRepository
    ) {
        this.profileRepository = profileRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.contactInfoRepository = contactInfoRepository;
        this.websiteSettingsRepository = websiteSettingsRepository;
    }

    @Override
    public void run(String... args) {
        seedProfile();
        seedEducation();
        seedSkills();
        seedProjects();
        seedContactInfo();
        seedWebsiteSettings();
    }

    private void seedProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = new Profile();
            profile.setFullName("Shankar Chaudhary");
            profile.setDisplayName("Shankar");
            profile.setProfessionalTitle("Aspiring Software Developer and Full Stack Developer");
            profile.setHeroHeading("Building Digital Experiences Through Code.");
            profile.setHeroSubtitle("Crafting modern, accessible web applications and reliable software solutions with React, Spring Boot, Node.js, and clean code.");
            profile.setShortIntro("I am a passionate developer who enjoys building modern websites, solving programming problems, and developing practical software solutions. I continuously explore new technologies and improve my development skills.");
            profile.setSupportingText("Focused on writing clean, maintainable code across full-stack web architectures—combining responsive React and modern frontend interfaces with structured Java Spring Boot and Node.js backend systems.");
            profile.setDetailedBio("Hello! I'm Shankar Chaudhary, an aspiring Software Developer and Full Stack Developer currently pursuing my B.Tech degree in India. I am passionate about building modern websites, solving programming problems, and developing practical software solutions that are clean, accessible, and reliable.");
            profile.setDeveloperOverview("As a B.Tech student in India, I approach software engineering with curiosity and discipline. From foundational data structures in C, C++, and Java to building end-to-end web applications using React, Tailwind CSS, Spring Boot, Node.js, and relational databases, I enjoy turning ideas into reliable, user-centered software.");
            profile.setDeveloperJourney("My journey in programming started with core languages like C and C++, where I learned how memory, control flow, and algorithmic logic work under the hood. Moving into object-oriented programming with Java and interactive web development with HTML, CSS, and JavaScript, I discovered how rewarding it is to build full-stack applications that solve real everyday needs—such as academic learning management, hospitality portals, and student accommodation directories.");
            profile.setCurrentStatus("B.Tech Student • Available for software engineering opportunities");
            profile.setLocation("India");
            profile.setCareerObjective("My primary goal is to grow into a versatile, dependable Software & Full Stack Engineer capable of contributing to impactful engineering teams. I aim to continuously deepen my understanding of scalable system design, write clean and testable code, and build digital products that deliver genuine value to users.");
            profile.setProfileImageUrl("/assets/images/profile/profile-photo.jpg");
            profile.setAboutImageUrl("/assets/images/profile/about-photo.jpg");
            profile.setPublished(true);
            profileRepository.save(profile);
        }
    }

    private void seedEducation() {
        if (educationRepository.count() == 0) {
            Education edu = new Education();
            edu.setInstitution("College / University");
            edu.setUniversity("University");
            edu.setDegree("Bachelor of Technology (B.Tech)");
            edu.setBranch("Computer Science & Engineering");
            edu.setCurrentSemesterOrYear("Current Student");
            edu.setStartYear("2022");
            edu.setEndYear("2026");
            edu.setDates("2022 - 2026");
            edu.setDescription("Pursuing undergraduate engineering with an active focus on software development, algorithmic problem solving, object-oriented design in Java, and modern full-stack web applications.");
            edu.setLocation("India");
            edu.setDisplayOrder(1);
            edu.setPublished(true);
            educationRepository.save(edu);
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> defaultSkills = List.of(
                new Skill("C", "Programming Languages", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", "Procedural programming, memory concepts, control structures.", false, 1),
                new Skill("C++", "Programming Languages", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", "Object-oriented programming, STL fundamentals.", false, 2),
                new Skill("Java", "Programming Languages", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", "Object-oriented design, collections, and enterprise backend logic.", true, 3),
                new Skill("JavaScript", "Programming Languages", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", "Async programming, ES6+ syntax, DOM manipulation.", true, 4),
                new Skill("HTML", "Frontend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", "Semantic document structure, accessible forms.", false, 5),
                new Skill("CSS", "Frontend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", "Responsive Flexbox and Grid layouts, modular styling.", false, 6),
                new Skill("React", "Frontend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "Component UI architecture, hooks, state management.", true, 7),
                new Skill("Tailwind CSS", "Frontend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", "Utility-first responsive styling and clean themes.", true, 8),
                new Skill("Java Spring Boot", "Backend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", "MVC controllers, RESTful services, and Spring Data persistence.", true, 9),
                new Skill("Node.js", "Backend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", "Event-driven runtime for server-side applications.", true, 10),
                new Skill("Express.js", "Backend Development", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", "Lightweight routing and REST API endpoints.", false, 11),
                new Skill("MySQL", "Databases", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", "Relational schema modeling, SQL queries, and indexing.", true, 12),
                new Skill("MariaDB", "Databases", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg", "Relational database used with Spring Boot platforms.", false, 13),
                new Skill("Git", "Developer Tools", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", "Distributed version control and branch workflows.", false, 14),
                new Skill("GitHub", "Developer Tools", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", "Code hosting, repositories, and collaboration.", true, 15),
                new Skill("VS Code", "Developer Tools", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", "Primary code editor for web workflows.", false, 16),
                new Skill("IntelliJ IDEA", "Developer Tools", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg", "Dedicated IDE for Java and Spring Boot development.", false, 17)
            );
            skillRepository.saveAll(defaultSkills);
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            Project p1 = new Project();
            p1.setTitle("Smart Learning Management System (LMS)");
            p1.setSlug("smart-lms");
            p1.setCategory("Full Stack • Java Spring Boot");
            p1.setShortDescription("A complete learning management platform designed to manage students, teachers, courses, quizzes, and academic activities.");
            p1.setDetailedDescription("A complete learning management platform designed to manage students, teachers, courses, quizzes, and academic activities with role-based access control and persistent relational storage.");
            p1.setThumbnailUrl("/assets/images/projects/lms-screenshot.jpg");
            p1.setTechnologiesJson("[\"Java\",\"Spring Boot\",\"HTML\",\"CSS\",\"JavaScript\",\"MariaDB\"]");
            p1.setHighlightsJson("[\"Role-based academic workflows for students and instructors\",\"Course catalog, quiz management, and academic activity tracking\",\"Relational persistence powered by Java Spring Boot and MariaDB\"]");
            p1.setGithubUrl("");
            p1.setLiveDemoUrl("");
            p1.setFeatured(true);
            p1.setPublished(true);
            p1.setDisplayOrder(1);
            p1.setProjectStatus("Completed");

            Project p2 = new Project();
            p2.setTitle("Cafe and Hotel Haven");
            p2.setSlug("cafe-hotel-haven");
            p2.setCategory("Full Stack • Node.js & Express");
            p2.setShortDescription("A cafe and hotel management website with frontend and backend integration.");
            p2.setDetailedDescription("A full-featured cafe and hotel management website featuring interactive dining and accommodation views connected to a Node.js and Express backend with MySQL persistence.");
            p2.setThumbnailUrl("/assets/images/projects/cafe-screenshot.jpg");
            p2.setTechnologiesJson("[\"HTML\",\"CSS\",\"JavaScript\",\"Node.js\",\"Express.js\",\"MySQL\"]");
            p2.setHighlightsJson("[\"Interactive hospitality interface showcasing dining and room offerings\",\"Backend server integration built with Node.js and Express.js\",\"Structured MySQL database storage for management operations\"]");
            p2.setGithubUrl("");
            p2.setLiveDemoUrl("");
            p2.setFeatured(true);
            p2.setPublished(true);
            p2.setDisplayOrder(2);
            p2.setProjectStatus("Completed");

            Project p3 = new Project();
            p3.setTitle("KUNJ'S PG HOUSE");
            p3.setSlug("kunjs-pg-house");
            p3.setCategory("Frontend Web Application");
            p3.setShortDescription("A responsive PG accommodation website designed to display rooms, facilities, pricing, and booking information.");
            p3.setDetailedDescription("A responsive PG accommodation website crafted for prospective residents to view room categories, amenities, pricing plans, and booking procedures with interactive client-side logic.");
            p3.setThumbnailUrl("/assets/images/projects/pg-screenshot.jpg");
            p3.setTechnologiesJson("[\"HTML\",\"CSS\",\"JavaScript\"]");
            p3.setHighlightsJson("[\"Clean, mobile-friendly presentation of room categories and amenities\",\"Transparent pricing tiers and structured booking inquiry information\",\"Built with semantic HTML, modern CSS layouts, and interactive JavaScript\"]");
            p3.setGithubUrl("");
            p3.setLiveDemoUrl("");
            p3.setFeatured(true);
            p3.setPublished(true);
            p3.setDisplayOrder(3);
            p3.setProjectStatus("Completed");

            projectRepository.saveAll(List.of(p1, p2, p3));
        }
    }

    private void seedContactInfo() {
        if (contactInfoRepository.count() == 0) {
            ContactInfo contact = new ContactInfo();
            contact.setEmail("shankar.chaudhary@example.com");
            contact.setMobileNumber("9905340058");
            contact.setLocation("India");
            contact.setLocationDisplay("India");
            contact.setHeading("Let's Connect & Build Something Great");
            contact.setShortMessage("Whether you have a question about my projects, want to discuss software development opportunities, or simply wish to connect, feel free to reach out. I check my messages regularly and look forward to hearing from you.");
            contact.setGithubUrl("");
            contact.setLinkedinUrl("");
            contact.setInstagramUrl("");
            contact.setTwitterUrl("");
            contactInfoRepository.save(contact);
        }
    }

    private void seedWebsiteSettings() {
        if (websiteSettingsRepository.count() == 0) {
            WebsiteSettings settings = new WebsiteSettings();
            settings.setWebsiteTitle("Shankar Chaudhary | Software & Full Stack Developer");
            settings.setWebsiteDescription("Personal portfolio of Shankar Chaudhary - Aspiring Software Developer and Full Stack Developer.");
            settings.setFooterText("Crafted with React, Tailwind CSS, Java Spring Boot & Clean Architecture");
            settings.setCopyrightNotice("All rights reserved.");
            settings.setPublished(true);
            websiteSettingsRepository.save(settings);
        }
    }
}

