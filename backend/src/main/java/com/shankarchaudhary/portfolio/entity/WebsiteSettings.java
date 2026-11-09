package com.shankarchaudhary.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "website_settings")
public class WebsiteSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String websiteTitle;

    @Column(columnDefinition = "TEXT")
    private String websiteDescription;

    private String faviconUrl;

    private String logoUrl;

    private String footerText;

    private String copyrightNotice;

    private String seoTitle;

    @Column(columnDefinition = "TEXT")
    private String seoDescription;

    private String ogImageUrl;

    private boolean isPublished = true;

    public WebsiteSettings() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWebsiteTitle() { return websiteTitle; }
    public void setWebsiteTitle(String websiteTitle) { this.websiteTitle = websiteTitle; }

    public String getWebsiteDescription() { return websiteDescription; }
    public void setWebsiteDescription(String websiteDescription) { this.websiteDescription = websiteDescription; }

    public String getFaviconUrl() { return faviconUrl; }
    public void setFaviconUrl(String faviconUrl) { this.faviconUrl = faviconUrl; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getFooterText() { return footerText; }
    public void setFooterText(String footerText) { this.footerText = footerText; }

    public String getCopyrightNotice() { return copyrightNotice; }
    public void setCopyrightNotice(String copyrightNotice) { this.copyrightNotice = copyrightNotice; }

    public String getSeoTitle() { return seoTitle; }
    public void setSeoTitle(String seoTitle) { this.seoTitle = seoTitle; }

    public String getSeoDescription() { return seoDescription; }
    public void setSeoDescription(String seoDescription) { this.seoDescription = seoDescription; }

    public String getOgImageUrl() { return ogImageUrl; }
    public void setOgImageUrl(String ogImageUrl) { this.ogImageUrl = ogImageUrl; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }
}

