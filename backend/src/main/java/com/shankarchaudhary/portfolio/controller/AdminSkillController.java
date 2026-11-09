package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.Skill;
import com.shankarchaudhary.portfolio.repository.SkillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/skills")
public class AdminSkillController {

    private final SkillRepository skillRepository;

    public AdminSkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillRepository.findAllByOrderByCategoryAscDisplayOrderAscIdAsc());
    }

    @PostMapping
    public ResponseEntity<?> createSkill(@RequestBody Skill skill) {
        if (skill.getName() == null || skill.getCategory() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name and category are required"));
        }
        return ResponseEntity.ok(skillRepository.save(skill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSkill(@PathVariable Long id, @RequestBody Skill updated) {
        return skillRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setCategory(updated.getCategory());
            existing.setIconUrl(updated.getIconUrl());
            existing.setSkillLevel(updated.getSkillLevel());
            existing.setDescription(updated.getDescription());
            existing.setDisplayOrder(updated.getDisplayOrder());
            existing.setFeatured(updated.isFeatured());
            existing.setPublished(updated.isPublished());
            return ResponseEntity.ok(skillRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        if (!skillRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        skillRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Skill deleted successfully"));
    }
}

