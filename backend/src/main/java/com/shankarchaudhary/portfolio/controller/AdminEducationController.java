package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.Education;
import com.shankarchaudhary.portfolio.repository.EducationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/education")
public class AdminEducationController {

    private final EducationRepository educationRepository;

    public AdminEducationController(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {
        return ResponseEntity.ok(educationRepository.findAllByOrderByDisplayOrderAscIdAsc());
    }

    @PostMapping
    public ResponseEntity<?> createEducation(@RequestBody Education education) {
        if (education.getInstitution() == null || education.getDegree() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Institution and Degree are required."));
        }
        Education saved = educationRepository.save(education);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEducation(@PathVariable Long id, @RequestBody Education updated) {
        return educationRepository.findById(id).map(existing -> {
            existing.setInstitution(updated.getInstitution());
            existing.setUniversity(updated.getUniversity());
            existing.setDegree(updated.getDegree());
            existing.setBranch(updated.getBranch());
            existing.setCurrentSemesterOrYear(updated.getCurrentSemesterOrYear());
            existing.setStartYear(updated.getStartYear());
            existing.setEndYear(updated.getEndYear());
            existing.setDates(updated.getDates());
            existing.setDescription(updated.getDescription());
            existing.setLocation(updated.getLocation());
            existing.setLogoUrl(updated.getLogoUrl());
            existing.setDisplayOrder(updated.getDisplayOrder());
            existing.setPublished(updated.isPublished());
            return ResponseEntity.ok(educationRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
        if (!educationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        educationRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Education record deleted successfully"));
    }
}

