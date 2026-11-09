package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.DocumentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DocumentItemRepository extends JpaRepository<DocumentItem, Long> {
    List<DocumentItem> findAllByOrderByCreatedAtDesc();
    List<DocumentItem> findByIsPublicTrueOrderByCreatedAtDesc();
    Optional<DocumentItem> findFirstByIsResumeTrueAndIsPublicTrueOrderByCreatedAtDesc();
}

