package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.Project;
import com.shankarchaudhary.portfolio.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/projects")
public class AdminProjectController {

    private final ProjectRepository projectRepository;

    public AdminProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepository.findAllByOrderByDisplayOrderAscIdDesc());
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        if (project.getTitle() == null || project.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Project title is required"));
        }
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(projectRepository.save(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project updated) {
        return projectRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setSlug(updated.getSlug());
            existing.setCategory(updated.getCategory());
            existing.setShortDescription(updated.getShortDescription());
            existing.setDetailedDescription(updated.getDetailedDescription());
            existing.setThumbnailUrl(updated.getThumbnailUrl());
            existing.setScreenshotsJson(updated.getScreenshotsJson());
            existing.setTechnologiesJson(updated.getTechnologiesJson());
            existing.setHighlightsJson(updated.getHighlightsJson());
            existing.setGithubUrl(updated.getGithubUrl());
            existing.setLiveDemoUrl(updated.getLiveDemoUrl());
            existing.setVideoUrl(updated.getVideoUrl());
            existing.setStartDate(updated.getStartDate());
            existing.setCompletionDate(updated.getCompletionDate());
            existing.setProjectStatus(updated.getProjectStatus());
            existing.setFeatured(updated.isFeatured());
            existing.setPublished(updated.isPublished());
            existing.setDisplayOrder(updated.getDisplayOrder());
            existing.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(projectRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/duplicate")
    public ResponseEntity<?> duplicateProject(@PathVariable Long id) {
        return projectRepository.findById(id).map(source -> {
            Project copy = new Project();
            copy.setTitle(source.getTitle() + " (Copy)");
            copy.setSlug(source.getSlug() != null ? source.getSlug() + "-copy" : null);
            copy.setCategory(source.getCategory());
            copy.setShortDescription(source.getShortDescription());
            copy.setDetailedDescription(source.getDetailedDescription());
            copy.setThumbnailUrl(source.getThumbnailUrl());
            copy.setScreenshotsJson(source.getScreenshotsJson());
            copy.setTechnologiesJson(source.getTechnologiesJson());
            copy.setHighlightsJson(source.getHighlightsJson());
            copy.setGithubUrl(source.getGithubUrl());
            copy.setLiveDemoUrl(source.getLiveDemoUrl());
            copy.setVideoUrl(source.getVideoUrl());
            copy.setStartDate(source.getStartDate());
            copy.setCompletionDate(source.getCompletionDate());
            copy.setProjectStatus(source.getProjectStatus());
            copy.setFeatured(false);
            copy.setPublished(false); // drafts copy
            copy.setDisplayOrder(source.getDisplayOrder() + 1);
            copy.setCreatedAt(LocalDateTime.now());
            copy.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(projectRepository.save(copy));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        projectRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Project deleted successfully"));
    }
}

