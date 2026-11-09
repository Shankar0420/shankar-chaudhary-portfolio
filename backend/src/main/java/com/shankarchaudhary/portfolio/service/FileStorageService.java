package com.shankarchaudhary.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@Service
public class FileStorageService {

    private final Path uploadLocation;

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            "jpg", "jpeg", "png", "webp", "svg", "gif",
            "pdf", "doc", "docx", "txt"
    );

    private static final Set<String> BLOCKED_EXTENSIONS = Set.of(
            "exe", "sh", "bat", "cmd", "js", "html", "php", "jsp", "py", "jar", "war", "vbs"
    );

    public FileStorageService(@Value("${portfolio.upload.dir:./backend/uploads}") String uploadDir) {
        this.uploadLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadLocation);
            Files.createDirectories(this.uploadLocation.resolve("images"));
            Files.createDirectories(this.uploadLocation.resolve("documents"));
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize file storage directory", e);
        }
    }

    public static class StoredFileResult {
        public String originalFileName;
        public String storedFileName;
        public String fileUrl;
        public String contentType;
        public long size;

        public StoredFileResult(String originalFileName, String storedFileName, String fileUrl, String contentType, long size) {
            this.originalFileName = originalFileName;
            this.storedFileName = storedFileName;
            this.fileUrl = fileUrl;
            this.contentType = contentType;
            this.size = size;
        }
    }

    public StoredFileResult storeFile(MultipartFile file, String category) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file");
        }

        String originalFilename = StringUtils.cleanPath(Objects.requireNonNullElse(file.getOriginalFilename(), "file"));
        String extension = getFileExtension(originalFilename).toLowerCase();

        if (BLOCKED_EXTENSIONS.contains(extension)) {
            throw new SecurityException("Upload of executable or script files is strictly forbidden: ." + extension);
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("File type not allowed. Allowed types: " + ALLOWED_EXTENSIONS);
        }

        // Subdirectory based on category
        String subFolder = isDocumentType(extension) ? "documents" : "images";
        Path targetDir = this.uploadLocation.resolve(subFolder);

        String uniqueFileName = UUID.randomUUID().toString() + "_" + System.currentTimeMillis() + "." + extension;
        Path targetPath = targetDir.resolve(uniqueFileName);

        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "/uploads/" + subFolder + "/" + uniqueFileName;
        return new StoredFileResult(
                originalFilename,
                uniqueFileName,
                fileUrl,
                file.getContentType(),
                file.getSize()
        );
    }

    public boolean deleteFileByUrl(String fileUrl) {
        if (fileUrl == null || !fileUrl.startsWith("/uploads/")) {
            return false;
        }
        try {
            String relative = fileUrl.substring("/uploads/".length());
            Path filePath = this.uploadLocation.resolve(relative).normalize();
            if (filePath.startsWith(this.uploadLocation) && Files.exists(filePath)) {
                return Files.deleteIfExists(filePath);
            }
        } catch (Exception e) {
            // Ignore deletion error
        }
        return false;
    }

    private boolean isDocumentType(String ext) {
        return "pdf".equals(ext) || "doc".equals(ext) || "docx".equals(ext) || "txt".equals(ext);
    }

    private String getFileExtension(String filename) {
        int dot = filename.lastIndexOf('.');
        return (dot > 0 && dot < filename.length() - 1) ? filename.substring(dot + 1) : "";
    }
}

