package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.ContactInfo;
import com.shankarchaudhary.portfolio.repository.ContactInfoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/contact")
public class AdminContactController {

    private final ContactInfoRepository contactInfoRepository;

    public AdminContactController(ContactInfoRepository contactInfoRepository) {
        this.contactInfoRepository = contactInfoRepository;
    }

    @GetMapping
    public ResponseEntity<?> getContactInfo() {
        ContactInfo info = contactInfoRepository.findAll().stream().findFirst().orElseGet(() -> {
            ContactInfo c = new ContactInfo();
            return contactInfoRepository.save(c);
        });
        return ResponseEntity.ok(info);
    }

    @PutMapping
    public ResponseEntity<?> updateContactInfo(@RequestBody ContactInfo updated) {
        ContactInfo existing = contactInfoRepository.findAll().stream().findFirst().orElseGet(ContactInfo::new);

        existing.setEmail(updated.getEmail());
        existing.setMobileNumber(updated.getMobileNumber());
        existing.setLocation(updated.getLocation());
        existing.setLocationDisplay(updated.getLocationDisplay());
        existing.setHeading(updated.getHeading());
        existing.setShortMessage(updated.getShortMessage());
        existing.setGithubUrl(updated.getGithubUrl());
        existing.setLinkedinUrl(updated.getLinkedinUrl());
        existing.setInstagramUrl(updated.getInstagramUrl());
        existing.setTwitterUrl(updated.getTwitterUrl());
        existing.setOtherSocialLinksJson(updated.getOtherSocialLinksJson());

        return ResponseEntity.ok(contactInfoRepository.save(existing));
    }
}

