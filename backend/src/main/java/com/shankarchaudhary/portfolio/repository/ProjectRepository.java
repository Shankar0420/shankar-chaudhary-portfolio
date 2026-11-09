package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAscIdDesc();
    List<Project> findByIsPublishedTrueOrderByDisplayOrderAscIdDesc();
    List<Project> findByFeaturedTrueAndIsPublishedTrueOrderByDisplayOrderAscIdDesc();
}

