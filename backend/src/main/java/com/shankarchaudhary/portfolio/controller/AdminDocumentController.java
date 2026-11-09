package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.DocumentItem;
import com.shankarchaudhary.portfolio.repository.DocumentItemRepository;
import com.shankarchaudhary.portfolio.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/documents")
public class AdminDocumentController {

    private final DocumentItemRepository documentItemRepository;
    private final FileStorageService fileStorageService;

    public AdminDocumentController(DocumentItemRepository documentItemRepository, FileStorageService fileStorageService) {
        this.documentItemRepository = documentItemRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<List<DocumentItem>> getAllDocuments() {
        return ResponseEntity.ok(documentItemRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<?> createDocument(@RequestBody DocumentItem doc) {
        if (doc.getTitle() == null || doc.getFileUrl() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Title and File URL are required"));
        }
        if (doc.isResume()) {
            // Unset any previous active resume
            List<DocumentItem> existing = documentItemRepository.findAll();
            for (DocumentItem d : existing) {
                if (d.isResume()) {
                    d.setResume(false);
                    documentItemRepository.save(d);
                }
            }
        }
        doc.setCreatedAt(LocalDateTime.now());
        return ResponseEntity.ok(documentItemRepository.save(doc));
    }

    @PutMapping("/{id}/set-resume")
    public ResponseEntity<?> setActiveResume(@PathVariable Long id) {
        return documentItemRepository.findById(id).map(selected -> {
            List<DocumentItem> all = documentItemRepository.findAll();
            for (DocumentItem d : all) {
                d.setResume(d.getId().equals(id));
                documentItemRepository.save(d);
            }
            return ResponseEntity.ok(Map.of("message", "Document set as primary active resume", "activeResume", selected));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/toggle-visibility")
    public ResponseEntity<?> toggleVisibility(@PathVariable Long id) {
        return documentItemRepository.findById(id).map(doc -> {
            doc.setPublic(!doc.isPublic());
            return ResponseEntity.ok(documentItemRepository.save(doc));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        return documentItemRepository.findById(id).map(doc -> {
            fileStorageService.deleteFileByUrl(doc.getFileUrl());
            documentItemRepository.delete(doc);
            return ResponseEntity.ok(Map.of("message", "Document deleted successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}

