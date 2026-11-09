package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.Certificate;
import com.shankarchaudhary.portfolio.repository.CertificateRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/certificates")
public class AdminCertificateController {

    private final CertificateRepository certificateRepository;

    public AdminCertificateController(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {
        return ResponseEntity.ok(certificateRepository.findAllByOrderByDisplayOrderAscIdDesc());
    }

    @PostMapping
    public ResponseEntity<?> createCertificate(@RequestBody Certificate certificate) {
        if (certificate.getTitle() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Certificate title is required"));
        }
        certificate.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(certificateRepository.save(certificate));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertificate(@PathVariable Long id, @RequestBody Certificate updated) {
        return certificateRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setIssuingOrganization(updated.getIssuingOrganization());
            existing.setIssueDate(updated.getIssueDate());
            existing.setDescription(updated.getDescription());
            existing.setFileUrl(updated.getFileUrl());
            existing.setVerificationUrl(updated.getVerificationUrl());
            existing.setPublished(updated.isPublished());
            existing.setDisplayOrder(updated.getDisplayOrder());
            return ResponseEntity.ok(certificateRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertificate(@PathVariable Long id) {
        if (!certificateRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        certificateRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Certificate deleted successfully"));
    }
}

