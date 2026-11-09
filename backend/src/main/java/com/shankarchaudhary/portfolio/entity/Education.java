package com.shankarchaudhary.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "educations")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String institution;

    private String university;

    @Column(nullable = false)
    private String degree;

    private String branch;

    private String currentSemesterOrYear;

    private String startYear;

    private String endYear;

    private String dates;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private String logoUrl;

    private int displayOrder = 0;

    private boolean isPublished = true;

    public Education() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getCurrentSemesterOrYear() { return currentSemesterOrYear; }
    public void setCurrentSemesterOrYear(String currentSemesterOrYear) { this.currentSemesterOrYear = currentSemesterOrYear; }

    public String getStartYear() { return startYear; }
    public void setStartYear(String startYear) { this.startYear = startYear; }

    public String getEndYear() { return endYear; }
    public void setEndYear(String endYear) { this.endYear = endYear; }

    public String getDates() { return dates; }
    public void setDates(String dates) { this.dates = dates; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }
}

