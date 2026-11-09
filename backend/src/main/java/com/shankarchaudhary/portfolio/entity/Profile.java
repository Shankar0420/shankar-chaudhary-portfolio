package com.shankarchaudhary.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    private String displayName;

    private String professionalTitle;

    @Column(columnDefinition = "TEXT")
    private String heroHeading;

    @Column(columnDefinition = "TEXT")
    private String heroSubtitle;

    @Column(columnDefinition = "TEXT")
    private String shortIntro;

    @Column(columnDefinition = "TEXT")
    private String supportingText;

    @Column(columnDefinition = "TEXT")
    private String detailedBio;

    @Column(columnDefinition = "TEXT")
    private String developerOverview;

    @Column(columnDefinition = "TEXT")
    private String developerJourney;

    private String currentStatus;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String careerObjective;

    @Column(columnDefinition = "TEXT")
    private String technicalInterestsJson;

    @Column(columnDefinition = "TEXT")
    private String timelineJson;

    @Column(columnDefinition = "TEXT")
    private String learningApproachJson;

    private String profileImageUrl;

    private String aboutImageUrl;

    private boolean isPublished = true;

    private LocalDateTime updatedAt = LocalDateTime.now();

    public Profile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public String getProfessionalTitle() { return professionalTitle; }
    public void setProfessionalTitle(String professionalTitle) { this.professionalTitle = professionalTitle; }

    public String getHeroHeading() { return heroHeading; }
    public void setHeroHeading(String heroHeading) { this.heroHeading = heroHeading; }

    public String getHeroSubtitle() { return heroSubtitle; }
    public void setHeroSubtitle(String heroSubtitle) { this.heroSubtitle = heroSubtitle; }

    public String getShortIntro() { return shortIntro; }
    public void setShortIntro(String shortIntro) { this.shortIntro = shortIntro; }

    public String getSupportingText() { return supportingText; }
    public void setSupportingText(String supportingText) { this.supportingText = supportingText; }

    public String getDetailedBio() { return detailedBio; }
    public void setDetailedBio(String detailedBio) { this.detailedBio = detailedBio; }

    public String getDeveloperOverview() { return developerOverview; }
    public void setDeveloperOverview(String developerOverview) { this.developerOverview = developerOverview; }

    public String getDeveloperJourney() { return developerJourney; }
    public void setDeveloperJourney(String developerJourney) { this.developerJourney = developerJourney; }

    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCareerObjective() { return careerObjective; }
    public void setCareerObjective(String careerObjective) { this.careerObjective = careerObjective; }

    public String getTechnicalInterestsJson() { return technicalInterestsJson; }
    public void setTechnicalInterestsJson(String technicalInterestsJson) { this.technicalInterestsJson = technicalInterestsJson; }

    public String getTimelineJson() { return timelineJson; }
    public void setTimelineJson(String timelineJson) { this.timelineJson = timelineJson; }

    public String getLearningApproachJson() { return learningApproachJson; }
    public void setLearningApproachJson(String learningApproachJson) { this.learningApproachJson = learningApproachJson; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

    public String getAboutImageUrl() { return aboutImageUrl; }
    public void setAboutImageUrl(String aboutImageUrl) { this.aboutImageUrl = aboutImageUrl; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

