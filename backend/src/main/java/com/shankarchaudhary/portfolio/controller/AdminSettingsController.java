package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.WebsiteSettings;
import com.shankarchaudhary.portfolio.repository.WebsiteSettingsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminSettingsController {

    private final WebsiteSettingsRepository settingsRepository;

    public AdminSettingsController(WebsiteSettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    @GetMapping
    public ResponseEntity<?> getSettings() {
        WebsiteSettings settings = settingsRepository.findAll().stream().findFirst().orElseGet(() -> {
            WebsiteSettings s = new WebsiteSettings();
            s.setWebsiteTitle("Shankar Chaudhary Portfolio");
            return settingsRepository.save(s);
        });
        return ResponseEntity.ok(settings);
    }

    @PutMapping
    public ResponseEntity<?> updateSettings(@RequestBody WebsiteSettings updated) {
        WebsiteSettings existing = settingsRepository.findAll().stream().findFirst().orElseGet(WebsiteSettings::new);

        existing.setWebsiteTitle(updated.getWebsiteTitle());
        existing.setWebsiteDescription(updated.getWebsiteDescription());
        existing.setFaviconUrl(updated.getFaviconUrl());
        existing.setLogoUrl(updated.getLogoUrl());
        existing.setFooterText(updated.getFooterText());
        existing.setCopyrightNotice(updated.getCopyrightNotice());
        existing.setSeoTitle(updated.getSeoTitle());
        existing.setSeoDescription(updated.getSeoDescription());
        existing.setOgImageUrl(updated.getOgImageUrl());
        existing.setPublished(updated.isPublished());

        return ResponseEntity.ok(settingsRepository.save(existing));
    }
}

