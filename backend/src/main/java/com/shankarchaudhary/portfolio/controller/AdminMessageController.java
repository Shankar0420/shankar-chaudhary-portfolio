package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.ContactSubmission;
import com.shankarchaudhary.portfolio.repository.ContactSubmissionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/messages")
public class AdminMessageController {

    private final ContactSubmissionRepository contactSubmissionRepository;

    public AdminMessageController(ContactSubmissionRepository contactSubmissionRepository) {
        this.contactSubmissionRepository = contactSubmissionRepository;
    }

    @GetMapping
    public ResponseEntity<List<ContactSubmission>> getAllMessages() {
        return ResponseEntity.ok(contactSubmissionRepository.findAllByOrderBySubmittedAtDesc());
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        return contactSubmissionRepository.findById(id).map(msg -> {
            msg.setRead(true);
            return ResponseEntity.ok(contactSubmissionRepository.save(msg));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        if (!contactSubmissionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        contactSubmissionRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Message deleted successfully"));
    }
}

