// ============================================================================
// SOCIAL MEDIA LINKS CONFIGURATION
// Add or edit your public social profiles here.
// Empty strings ("") or disabled profiles (visible: false) are automatically
// hidden across the Navbar, Footer, and Contact pages.
// ============================================================================

const socialLinks = {
  // UPDATE YOUR GITHUB PROFILE LINK HERE
  github: "// ADD YOUR GITHUB PROFILE LINK HERE",

  // UPDATE YOUR LINKEDIN PROFILE LINK HERE
  linkedin: "// ADD YOUR LINKEDIN PROFILE LINK HERE",

  // UPDATE YOUR INSTAGRAM PROFILE LINK HERE (Optional - leave empty to hide)
  instagram: "",

  // UPDATE YOUR TWITTER / X PROFILE LINK HERE (Optional - leave empty to hide)
  twitter: "",

  // ARRAY OF CONFIGURED SOCIAL PROFILES (Used for dynamic listing)
  profiles: [
    {
      id: "github",
      name: "GitHub",
      url: "// ADD YOUR GITHUB PROFILE LINK HERE",
      icon: "Github",
      visible: true
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "// ADD YOUR LINKEDIN PROFILE LINK HERE",
      icon: "Linkedin",
      visible: true
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "",
      icon: "Instagram",
      visible: false
    },
    {
      id: "twitter",
      name: "Twitter",
      url: "",
      icon: "Twitter",
      visible: false
    }
  ]
};

export default socialLinks;

