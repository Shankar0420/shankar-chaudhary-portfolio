package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {

    List<UploadedFile> findByCategoryOrderByCreatedAtDesc(String category);

    Optional<UploadedFile> findByStoredFileName(String storedFileName);

    Optional<UploadedFile> findByFileUrl(String fileUrl);

    List<UploadedFile> findByActiveTrueOrderByCreatedAtDesc();
}

