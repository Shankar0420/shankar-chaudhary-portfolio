package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.ContactSubmission;
import com.shankarchaudhary.portfolio.repository.*;
import com.shankarchaudhary.portfolio.service.PortfolioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicApiController {

    private final PortfolioService portfolioService;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final EducationRepository educationRepository;
    private final CertificateRepository certificateRepository;
    private final ContactSubmissionRepository contactSubmissionRepository;

    public PublicApiController(
            PortfolioService portfolioService,
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            EducationRepository educationRepository,
            CertificateRepository certificateRepository,
            ContactSubmissionRepository contactSubmissionRepository
    ) {
        this.portfolioService = portfolioService;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.educationRepository = educationRepository;
        this.certificateRepository = certificateRepository;
        this.contactSubmissionRepository = contactSubmissionRepository;
    }

    @GetMapping("/portfolio")
    public ResponseEntity<?> getFullPortfolio() {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, must-revalidate, max-age=0")
                .body(portfolioService.getPublicPortfolioData());
    }

    @GetMapping("/projects")
    public ResponseEntity<?> getPublishedProjects() {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, must-revalidate, max-age=0")
                .body(projectRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdDesc());
    }

    @GetMapping("/skills")
    public ResponseEntity<?> getPublishedSkills() {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, must-revalidate, max-age=0")
                .body(skillRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdAsc());
    }

    @GetMapping("/education")
    public ResponseEntity<?> getPublishedEducation() {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, must-revalidate, max-age=0")
                .body(educationRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdAsc());
    }

    @GetMapping("/certificates")
    public ResponseEntity<?> getPublishedCertificates() {
        return ResponseEntity.ok()
                .header("Cache-Control", "no-cache, must-revalidate, max-age=0")
                .body(certificateRepository.findByIsPublishedTrueOrderByDisplayOrderAscIdDesc());
    }

    @PostMapping("/contact/submit")
    public ResponseEntity<?> submitContactMessage(@RequestBody Map<String, String> payload, HttpServletRequest request) {
        // Honeypot spam check (if bot filled hidden field "website")
        String honeypot = payload.get("website_url_check");
        if (honeypot != null && !honeypot.trim().isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "Message received."));
        }

        String fullName = payload.get("fullName");
        String email = payload.get("email");
        String subject = payload.get("subject");
        String message = payload.get("message");

        if (fullName == null || fullName.trim().length() < 2) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name must be at least 2 characters."));
        }
        if (email == null || !email.contains("@") || !email.contains(".")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please provide a valid email address."));
        }
        if (subject == null || subject.trim().length() < 3) {
            return ResponseEntity.badRequest().body(Map.of("error", "Subject must be at least 3 characters."));
        }
        if (message == null || message.trim().length() < 10) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message must be at least 10 characters."));
        }

        ContactSubmission submission = new ContactSubmission(
                fullName.trim(),
                email.trim(),
                subject.trim(),
                message.trim(),
                request.getRemoteAddr()
        );
        contactSubmissionRepository.save(submission);

        return ResponseEntity.ok(Map.of("message", "Your message has been sent successfully. Thank you!"));
    }
}

