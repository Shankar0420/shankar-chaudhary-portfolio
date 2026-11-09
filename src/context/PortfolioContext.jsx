import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import portfolioDataDefault, { skillsCategories as defaultCategories } from '../data/portfolioData';
import { portfolioApi } from '../services/portfolioApi';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState({
    personal: portfolioDataDefault.personal,
    education: portfolioDataDefault.education,
    skills: portfolioDataDefault.skills,
    projects: portfolioDataDefault.projects,
    contact: portfolioDataDefault.contact,
    social: portfolioDataDefault.social,
    isLiveFromBackend: false,
    loading: true
  });

  const refreshPortfolio = useCallback(async () => {
    try {
      const live = await portfolioApi.getPublicPortfolio();

      if (live && live.profile) {
        // Parse JSON fields safely if stored as string
        const parseJson = (val, fallback) => {
          if (!val) return fallback;
          if (typeof val === 'object') return val;
          try { return JSON.parse(val); } catch { return fallback; }
        };

        const liveProfile = live.profile;
        const liveProjects = (live.projects || []).map((p) => ({
          ...p,
          technologies: parseJson(p.technologiesJson, ["Web Development"]),
          highlights: parseJson(p.highlightsJson, []),
          screenshots: parseJson(p.screenshotsJson, []),
          videoUrl: p.videoUrl,
          image: p.thumbnailUrl || "/assets/images/projects/lms-screenshot.jpg",
          imageUploaded: Boolean(p.thumbnailUrl && !p.thumbnailUrl.startsWith("//")),
          githubUrl: p.githubUrl,
          liveUrl: p.liveDemoUrl,
          visible: p.isPublished
        }));

        // Group skills by category for Skills page
        const liveSkillsRaw = live.skills || [];
        const categoryMap = {};
        liveSkillsRaw.forEach((s) => {
          const catName = s.category || "Other Technical Skills";
          if (!categoryMap[catName]) {
            categoryMap[catName] = [];
          }
          categoryMap[catName].push({
            ...s,
            iconUrl: s.iconUrl,
            visible: s.isPublished
          });
        });

        const groupedCategories = Object.keys(categoryMap).map((catName, idx) => ({
          id: catName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          title: catName,
          subtitle: `Technologies in ${catName}`,
          accent: "from-purple-500/20 to-cyan-500/20",
          borderAccent: "hover:border-purple-500/50",
          items: categoryMap[catName]
        }));

        // Merge live data with safe fallbacks
        setData({
          personal: {
            ...portfolioDataDefault.personal,
            fullName: liveProfile.fullName || portfolioDataDefault.personal.fullName,
            displayName: liveProfile.displayName || liveProfile.fullName || portfolioDataDefault.personal.shortName,
            name: liveProfile.fullName || portfolioDataDefault.personal.fullName,
            professionalTitle: liveProfile.professionalTitle || portfolioDataDefault.personal.professionalTitle,
            heroHeading: liveProfile.heroHeading || portfolioDataDefault.personal.heroHeading,
            heroSubtitle: liveProfile.heroSubtitle || portfolioDataDefault.personal.heroSubtitle,
            introduction: liveProfile.shortIntro || portfolioDataDefault.personal.introduction,
            shortIntro: liveProfile.shortIntro || portfolioDataDefault.personal.shortIntro,
            supportingText: liveProfile.supportingText || portfolioDataDefault.personal.supportingText,
            aboutDescription: liveProfile.detailedBio || portfolioDataDefault.personal.aboutDescription,
            developerOverview: liveProfile.developerOverview || portfolioDataDefault.personal.developerOverview,
            developerJourney: liveProfile.developerJourney || portfolioDataDefault.personal.developerJourney,
            currentStatus: liveProfile.currentStatus || portfolioDataDefault.personal.currentStatus,
            location: liveProfile.location || portfolioDataDefault.personal.location,
            careerGoals: liveProfile.careerObjective || portfolioDataDefault.personal.careerGoals,
            profileImage: liveProfile.profileImageUrl || portfolioDataDefault.personal.profileImage,
            profileImageUploaded: Boolean(liveProfile.profileImageUrl && !liveProfile.profileImageUrl.startsWith("//")),
            aboutImage: liveProfile.aboutImageUrl || portfolioDataDefault.personal.aboutImage,
            aboutImageUploaded: Boolean(liveProfile.aboutImageUrl && !liveProfile.aboutImageUrl.startsWith("//")),
            resume: {
              ...portfolioDataDefault.personal.resume,
              filePath: live.resume || portfolioDataDefault.personal.resume.filePath,
              isUploaded: Boolean(live.resume)
            }
          },
          education: {
            education: (live.education && live.education.length > 0)
              ? live.education.map(e => ({ ...e, visible: e.isPublished }))
              : portfolioDataDefault.education.education,
            certificates: (live.certificates || []).map(c => ({ ...c, visible: c.isPublished }))
          },
          skills: {
            categories: groupedCategories.length > 0 ? groupedCategories : defaultCategories,
            learningInterests: portfolioDataDefault.skills.learningInterests
          },
          projects: liveProjects.length > 0 ? liveProjects : portfolioDataDefault.projects,
          contact: {
            ...portfolioDataDefault.contact,
            email: live.contact?.email || portfolioDataDefault.contact.email,
            phone: live.contact?.mobileNumber || portfolioDataDefault.contact.phone,
            location: live.contact?.location || portfolioDataDefault.contact.location,
            locationDisplay: live.contact?.locationDisplay || live.contact?.location || portfolioDataDefault.contact.locationDisplay,
            heading: live.contact?.heading || portfolioDataDefault.contact.heading,
            shortMessage: live.contact?.shortMessage || portfolioDataDefault.contact.shortMessage
          },
          social: {
            ...portfolioDataDefault.social,
            github: live.contact?.githubUrl || portfolioDataDefault.social.github,
            linkedin: live.contact?.linkedinUrl || portfolioDataDefault.social.linkedin,
            instagram: live.contact?.instagramUrl || portfolioDataDefault.social.instagram,
            twitter: live.contact?.twitterUrl || portfolioDataDefault.social.twitter
          },
          settings: live.settings || null,
          isLiveFromBackend: true,
          loading: false
        });
        return;
      }
    } catch {
      // Backend offline or starting up: keep fallback data
    } finally {
      setData((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    refreshPortfolio();
  }, [refreshPortfolio]);

  // Dynamically synchronize document title, favicon, and SEO meta tags from live settings
  useEffect(() => {
    if (data.settings) {
      if (data.settings.seoTitle || data.settings.websiteTitle) {
        document.title = data.settings.seoTitle || data.settings.websiteTitle;
      }
      if (data.settings.seoDescription || data.settings.websiteDescription) {
        let meta = document.querySelector('meta[name="description"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'description';
          document.head.appendChild(meta);
        }
        meta.content = data.settings.seoDescription || data.settings.websiteDescription;
      }
      if (data.settings.faviconUrl) {
        let favicon = document.querySelector("link[rel*='icon']");
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          document.head.appendChild(favicon);
        }
        favicon.href = data.settings.faviconUrl;
      }
    }
  }, [data.settings]);

  return (
    <PortfolioContext.Provider value={{ ...data, refreshPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

