package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByOrderByDisplayOrderAscIdAsc();
    List<Education> findByIsPublishedTrueOrderByDisplayOrderAscIdAsc();
}

