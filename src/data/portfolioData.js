// ============================================================================
// CENTRALIZED PORTFOLIO CONFIGURATION (100% CODE-CONTROLLED)
// Master configuration entry point for Shankar Kumar Chaudhary
// ============================================================================

import personalData from "./personalData.js";
import educationData, { educationList, certificatesList } from "./educationData.js";
import skillsData, { skillsCategories, learningInterests } from "./skillsData.js";
import projectsData from "./projectsData.js";
import contactData from "./contactData.js";
import socialLinks from "./socialLinks.js";

/**
 * Consolidated master portfolio configuration.
 * All public pages read directly from this static data source.
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

// Named modular exports
export {
  personalData,
  educationData,
  educationList,
  certificatesList,
  skillsData,
  skillsCategories,
  learningInterests,
  projectsData,
  contactData,
  socialLinks
};

// ============================================================================
// HELPER UTILITIES: URL & CONTENT VALIDATION
// ============================================================================

/**
 * Checks if a string is a real, configured external URL.
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.startsWith("//") || trimmed === "#" || trimmed === "") return false;
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
};

/**
 * Checks if a string is a valid email address.
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.startsWith("//") || trimmed === "") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
};

/**
 * Checks if a string is a valid phone number.
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

// Backward-compatibility aliases
export const personalInfo = personalData;
export const resumeConfig = personalData.resume;
export const aboutData = {
  personalIntroduction: personalData.aboutDescription,
  developerJourney: personalData.developerJourney,
  educationDetails: educationData.primary,
  careerGoals: personalData.careerGoals,
  technicalInterests: personalData.technicalInterests,
  learningApproach: personalData.learningApproach,
  progressionTimeline: personalData.timeline
};
