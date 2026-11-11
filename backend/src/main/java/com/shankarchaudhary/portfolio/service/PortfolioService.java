package com.shankarchaudhary.portfolio.service;

import com.shankarchaudhary.portfolio.entity.*;
import com.shankarchaudhary.portfolio.repository.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final CertificateRepository certificateRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;

    public PortfolioService(
            ProfileRepository profileRepository,
            EducationRepository educationRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            CertificateRepository certificateRepository,
            ContactInfoRepository contactInfoRepository,
            WebsiteSettingsRepository websiteSettingsRepository
    ) {
        this.profileRepository = profileRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.certificateRepository = certificateRepository;
        this.contactInfoRepository = contactInfoRepository;
        this.websiteSettingsRepository = websiteSettingsRepository;
    }

    public Map<String, Object> getPublicPortfolioData() {
        Map<String, Object> data = new HashMap<>();

        // Profile
        Profile profile = profileRepository.findAll().stream().findFirst().orElse(null);
        data.put("profile", profile);

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

        // Permanent static resume URL
        data.put("resume", "/assets/documents/resume/Shankar_Chaudhary_Resume.pdf");

        // Contact info
        ContactInfo contactInfo = contactInfoRepository.findAll().stream().findFirst().orElse(null);
        data.put("contact", contactInfo);

        // Website settings
        WebsiteSettings settings = websiteSettingsRepository.findAll().stream().findFirst().orElse(null);
        data.put("settings", settings);

        return data;
    }
}
