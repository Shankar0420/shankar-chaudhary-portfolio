package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.WebsiteSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebsiteSettingsRepository extends JpaRepository<WebsiteSettings, Long> {
}

