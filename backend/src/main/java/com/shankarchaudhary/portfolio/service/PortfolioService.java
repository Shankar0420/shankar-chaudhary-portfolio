package com.shankarchaudhary.portfolio.service;

import com.shankarchaudhary.portfolio.entity.*;
import com.shankarchaudhary.portfolio.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final CertificateRepository certificateRepository;
    private final DocumentItemRepository documentItemRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;
    private final ContactSubmissionRepository contactSubmissionRepository;

    public PortfolioService(
            ProfileRepository profileRepository,
            EducationRepository educationRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            CertificateRepository certificateRepository,
            DocumentItemRepository documentItemRepository,
            ContactInfoRepository contactInfoRepository,
            WebsiteSettingsRepository websiteSettingsRepository,
            ContactSubmissionRepository contactSubmissionRepository
    ) {
        this.profileRepository = profileRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.certificateRepository = certificateRepository;
        this.documentItemRepository = documentItemRepository;
        this.contactInfoRepository = contactInfoRepository;
        this.websiteSettingsRepository = websiteSettingsRepository;
        this.contactSubmissionRepository = contactSubmissionRepository;
    }

    public Map<String, Object> getPublicPortfolioData() {
        Map<String, Object> data = new HashMap<>();

        // Profile
        Profile profile = profileRepository.findAll().stream().findFirst().orElse(null);
        data.put("profile", profile != null && profile.isPublished() ? profile : profile);

        // Education (published only)
        List<Education> educationList = educationRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdAsc();
        data.put("education", educationList);

        // Skills (published only)
        List<Skill> skills = skillRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdAsc();
        data.put("skills", skills);

        // Projects (published only)
        List<Project> projects = projectRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdDesc();
        data.put("projects", projects);

        // Certificates (published only)
        List<Certificate> certificates = certificateRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdDesc();
        data.put("certificates", certificates);

        // Active published resume
        Optional<DocumentItem> activeResume = documentItemRepository.findFirstByIsResumeTrueAndIsPublicTrueOrderByCreatedAtDesc();
        data.put("resume", activeResume.map(DocumentItem::getFileUrl).orElse(null));
        data.put("resumeDetails", activeResume.orElse(null));

        // Contact info
        ContactInfo contactInfo = contactInfoRepository.findAll().stream().findFirst().orElse(null);
        data.put("contact", contactInfo);

        // Website settings
        WebsiteSettings settings = websiteSettingsRepository.findAll().stream().findFirst().orElse(null);
        data.put("settings", settings);

        return data;
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", projectRepository.count());
        stats.put("publishedProjects", projectRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdDesc().size());
        stats.put("totalSkills", skillRepository.count());
        stats.put("totalEducation", educationRepository.count());
        stats.put("totalCertificates", certificateRepository.count());
        stats.put("totalDocuments", documentItemRepository.count());
        stats.put("totalMessages", contactSubmissionRepository.count());
        stats.put("unreadMessages", contactSubmissionRepository.countByIsReadFalse());

        Profile profile = profileRepository.findAll().stream().findFirst().orElse(null);
        stats.put("lastUpdated", profile != null ? profile.getUpdatedAt() : LocalDateTime.now());
        stats.put("isPublished", profile != null && profile.isPublished());

        return stats;
    }
}

