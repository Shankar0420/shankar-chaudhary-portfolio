package com.shankarchaudhary.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category; // "Programming Languages", "Frontend Development", "Backend Development", "Databases", "Frameworks", "Developer Tools", "Other Technical Skills"

    private String iconUrl;

    private String skillLevel = "Proficient"; // "Beginner", "Familiar", "Intermediate", "Proficient", "Advanced"

    @Column(columnDefinition = "TEXT")
    private String description;

    private int displayOrder = 0;

    private boolean featured = false;

    private boolean isPublished = true;

    public Skill() {}

    public Skill(String name, String category, String iconUrl, String description, boolean featured, int displayOrder) {
        this.name = name;
        this.category = category;
        this.iconUrl = iconUrl;
        this.description = description;
        this.featured = featured;
        this.displayOrder = displayOrder;
        this.isPublished = true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }

    public String getSkillLevel() { return skillLevel; }
    public void setSkillLevel(String skillLevel) { this.skillLevel = skillLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }
}

