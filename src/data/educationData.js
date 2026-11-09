// ============================================================================
// EDUCATION & CERTIFICATES CONFIGURATION
// Add, edit, or remove your academic qualifications and certificates here.
// Note: We do NOT create fake records. Placeholders remain clean and configurable.
// ============================================================================

export const educationList = [
  {
    id: "btech-degree",
    // UPDATE YOUR INSTITUTION / UNIVERSITY NAME HERE
    institution: "// ADD COLLEGE OR UNIVERSITY NAME",
    // UPDATE YOUR DEGREE TITLE HERE
    degree: "Bachelor of Technology (B.Tech)",
    // UPDATE YOUR COURSE OR BRANCH HERE
    branch: "// ADD COURSE AND BRANCH",
    // UPDATE YOUR START AND END YEARS HERE
    startYear: "// START YEAR",
    endYear: "// END YEAR OR PRESENT",
    // Display dates string (or derived from startYear - endYear)
    dates: "// ADD EDUCATION DATES",
    currentYearOrSemester: "// ADD CURRENT YEAR OR SEMESTER",
    location: "India",
    description:
      "Pursuing undergraduate engineering with an active focus on software development, algorithmic problem solving, object-oriented design in Java, and modern full-stack web applications.",
    // Optional institution logo path (e.g. "/assets/images/education/college-logo.png")
    logo: "",
    visible: true
  }
];

export const certificatesList = [
  // Example certificate template (uncomment and populate when you earn certificates):
  /*
  {
    id: "cert-1",
    name: "Full Stack Web Development",
    issuer: "Udemy / Coursera",
    image: "/assets/images/certificates/web-dev-cert.jpg",
    issueDate: "2024",
    credentialUrl: "https://example.com/certificate/123",
    visible: true
  }
  */
];

const educationData = {
  education: educationList,
  certificates: certificatesList,
  // Helper for single/primary education display
  primary: educationList[0],
  // Certificates placeholder text
  certificatesPlaceholderComment:
    "// ADD YOUR CERTIFICATE IMAGE HERE (public/assets/images/certificates/)"
};

export default educationData;

