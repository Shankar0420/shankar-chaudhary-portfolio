package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.Profile;
import com.shankarchaudhary.portfolio.repository.ProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController {

    private final ProfileRepository profileRepository;

    public AdminProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping
    public ResponseEntity<?> getProfile() {
        Profile profile = profileRepository.findAll().stream().findFirst().orElseGet(() -> {
            Profile p = new Profile();
            p.setFullName("Shankar Chaudhary");
            return profileRepository.save(p);
        });
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody Profile updated) {
        Profile existing = profileRepository.findAll().stream().findFirst().orElseGet(Profile::new);

        existing.setFullName(updated.getFullName());
        existing.setDisplayName(updated.getDisplayName());
        existing.setProfessionalTitle(updated.getProfessionalTitle());
        existing.setHeroHeading(updated.getHeroHeading());
        existing.setHeroSubtitle(updated.getHeroSubtitle());
        existing.setShortIntro(updated.getShortIntro());
        existing.setSupportingText(updated.getSupportingText());
        existing.setDetailedBio(updated.getDetailedBio());
        existing.setDeveloperOverview(updated.getDeveloperOverview());
        existing.setDeveloperJourney(updated.getDeveloperJourney());
        existing.setCurrentStatus(updated.getCurrentStatus());
        existing.setLocation(updated.getLocation());
        existing.setCareerObjective(updated.getCareerObjective());
        existing.setTechnicalInterestsJson(updated.getTechnicalInterestsJson());
        existing.setTimelineJson(updated.getTimelineJson());
        existing.setLearningApproachJson(updated.getLearningApproachJson());
        existing.setProfileImageUrl(updated.getProfileImageUrl());
        existing.setAboutImageUrl(updated.getAboutImageUrl());
        existing.setPublished(updated.isPublished());
        existing.setUpdatedAt(LocalDateTime.now());

        Profile saved = profileRepository.save(existing);
        return ResponseEntity.ok(saved);
    }
}

