// ============================================================================
// CENTRALIZED PORTFOLIO DATA CONFIGURATION
// Master entry point combining all modular data sources.
// You can edit individual files in src/data/ or inspect the unified config here.
// ============================================================================

import personalData from "./personalData.js";
import educationData from "./educationData.js";
import skillsData, { skillsCategories, learningInterests } from "./skillsData.js";
import projectsData from "./projectsData.js";
import contactData from "./contactData.js";
import socialLinks from "./socialLinks.js";

/**
 * Main consolidated portfolio configuration object.
 */
const portfolioData = {
  personal: personalData,
  education: educationData,
  skills: skillsData,
  projects: projectsData,
  contact: contactData,
  social: socialLinks
};

export default portfolioData;

// Named exports for modular importing
export {
  personalData,
  educationData,
  skillsData,
  skillsCategories,
  learningInterests,
  projectsData,
  contactData,
  socialLinks
};

// ============================================================================
// HELPER UTILITIES: URL & CONTENT VALIDATION
// Ensures empty fields, placeholders, or broken URLs never crash the UI.
// ============================================================================

/**
 * Checks if a string is a real, configured external URL (not empty or a placeholder).
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.startsWith("//") || trimmed === "#" || trimmed === "") return false;
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
};

/**
 * Checks if a string is a valid configured email address.
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.startsWith("//") || trimmed === "") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

/**
 * Checks if a string is a valid configured phone number.
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== "string") return false;
  const trimmed = phone.trim();
  if (trimmed.startsWith("//") || trimmed === "") return false;
  return trimmed.length >= 7;
};

/**
 * Checks if a text value is configured (non-empty and not a placeholder comment).
 */
export const isConfigured = (val) => {
  if (!val || typeof val !== "string") return false;
  const trimmed = val.trim();
  return trimmed !== "" && !trimmed.startsWith("//");
};

// ============================================================================
// BACKWARD-COMPATIBILITY EXPORTS
// Kept to ensure zero breakage with legacy imports while components transition.
// ============================================================================
export const personalInfo = personalData;
export const resumeConfig = personalData.resume;
export const aboutData = {
  personalIntroduction: personalData.aboutDescription,
  developerJourney: personalData.developerJourney,
  educationDetails: educationData.primary || {
    institution: "// ADD COLLEGE OR UNIVERSITY NAME",
    courseAndBranch: "// ADD COURSE AND BRANCH",
    currentYearOrSemester: "// ADD CURRENT YEAR OR SEMESTER",
    dates: "// ADD EDUCATION DATES",
    degreeTitle: "Bachelor of Technology (B.Tech)",
    location: personalData.location || "India"
  },
  technicalInterests: personalData.technicalInterests,
  careerGoals: personalData.careerGoals,
  learningApproach: personalData.learningApproach,
  timeline: personalData.timeline,
  certificatesPlaceholderComment: educationData.certificatesPlaceholderComment
};
export const contactInfo = {
  ...contactData,
  github: socialLinks.github,
  linkedin: socialLinks.linkedin,
  instagram: socialLinks.instagram,
  twitter: socialLinks.twitter
};
