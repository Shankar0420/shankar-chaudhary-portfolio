package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.ContactSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactSubmissionRepository extends JpaRepository<ContactSubmission, Long> {
    List<ContactSubmission> findAllByOrderBySubmittedAtDesc();
    long countByIsReadFalse();
}

