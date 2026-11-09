package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.UploadedFile;
import com.shankarchaudhary.portfolio.repository.UploadedFileRepository;
import com.shankarchaudhary.portfolio.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/upload")
public class FileUploadController {

    private final FileStorageService fileStorageService;
    private final UploadedFileRepository uploadedFileRepository;

    public FileUploadController(
            FileStorageService fileStorageService,
            UploadedFileRepository uploadedFileRepository
    ) {
        this.fileStorageService = fileStorageService;
        this.uploadedFileRepository = uploadedFileRepository;
    }

    @GetMapping
    public ResponseEntity<List<UploadedFile>> listUploadedFiles() {
        return ResponseEntity.ok(uploadedFileRepository.findByActiveTrueOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "category", defaultValue = "general") String category
    ) {
        try {
            FileStorageService.StoredFileResult result = fileStorageService.storeFile(file, category);

            // Persist file metadata in the database
            UploadedFile metadata = new UploadedFile(
                    result.originalFileName,
                    result.storedFileName,
                    result.fileUrl,
                    category,
                    result.contentType,
                    result.size,
                    "PERSISTENT_DISK"
            );
            UploadedFile saved = uploadedFileRepository.save(metadata);

            return ResponseEntity.ok(Map.of(
                    "id", saved.getId(),
                    "originalFileName", result.originalFileName,
                    "storedFileName", result.storedFileName,
                    "fileUrl", result.fileUrl,
                    "contentType", result.contentType,
                    "size", result.size,
                    "message", "File uploaded and registered successfully"
            ));
        } catch (IllegalArgumentException | SecurityException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to store file: " + e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteFile(@RequestParam("fileUrl") String fileUrl) {
        boolean physicalDeleted = fileStorageService.deleteFileByUrl(fileUrl);
        uploadedFileRepository.findByFileUrl(fileUrl).ifPresent(record -> {
            record.setActive(false);
            uploadedFileRepository.save(record);
        });
        return ResponseEntity.ok(Map.of(
                "success", true,
                "physicalDeleted", physicalDeleted,
                "message", "File deleted successfully"
        ));
    }
}
