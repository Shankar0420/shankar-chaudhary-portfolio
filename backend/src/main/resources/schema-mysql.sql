-- ============================================================================
-- SHANKAR CHAUDHARY PORTFOLIO CMS - PRODUCTION MARIADB / MYSQL SCHEMA
-- Character set: utf8mb4 (Full Unicode support for emojis, icons, international text)
-- ============================================================================

CREATE TABLE IF NOT EXISTS admin_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mobile_number VARCHAR(32) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    recovery_key VARCHAR(128),
    role VARCHAR(32) DEFAULT 'ROLE_ADMIN',
    failed_attempts INT DEFAULT 0,
    lockout_time DATETIME NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(128),
    professional_title VARCHAR(255),
    profile_image_url VARCHAR(1024),
    about_image_url VARCHAR(1024),
    hero_heading VARCHAR(255),
    hero_subtitle TEXT,
    short_intro TEXT,
    supporting_text TEXT,
    detailed_bio LONGTEXT,
    developer_overview LONGTEXT,
    developer_journey LONGTEXT,
    location VARCHAR(255),
    current_status VARCHAR(255),
    career_objective TEXT,
    technical_interests_json TEXT,
    personal_interests_json TEXT,
    timeline_json TEXT,
    roles_json TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    degree VARCHAR(255) NOT NULL,
    branch VARCHAR(255),
    current_semester_or_year VARCHAR(128),
    start_year VARCHAR(32),
    end_year VARCHAR(32),
    dates VARCHAR(64),
    description TEXT,
    location VARCHAR(255),
    logo_url VARCHAR(1024),
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(128) NOT NULL,
    icon_url VARCHAR(1024),
    skill_level VARCHAR(64) DEFAULT 'Proficient',
    description TEXT,
    display_order INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    category VARCHAR(128),
    short_description TEXT,
    detailed_description LONGTEXT,
    thumbnail_url VARCHAR(1024),
    screenshots_json LONGTEXT,
    technologies_json TEXT,
    highlights_json TEXT,
    github_url VARCHAR(1024),
    live_demo_url VARCHAR(1024),
    video_url VARCHAR(1024),
    start_date VARCHAR(64),
    completion_date VARCHAR(64),
    project_status VARCHAR(64) DEFAULT 'Completed',
    featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date VARCHAR(64),
    credential_id VARCHAR(255),
    credential_url VARCHAR(1024),
    image_url VARCHAR(1024),
    description TEXT,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS document_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(64),
    file_size BIGINT,
    file_url VARCHAR(1024) NOT NULL,
    document_category VARCHAR(64) DEFAULT 'Resume',
    is_resume BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_info (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mobile_number VARCHAR(32),
    email VARCHAR(255),
    location VARCHAR(255),
    location_display VARCHAR(255),
    heading VARCHAR(255),
    short_message TEXT,
    github_url VARCHAR(1024),
    linkedin_url VARCHAR(1024),
    instagram_url VARCHAR(1024),
    twitter_url VARCHAR(1024),
    form_enabled BOOLEAN DEFAULT TRUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS website_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    website_title VARCHAR(255),
    website_description TEXT,
    favicon_url VARCHAR(1024),
    logo_url VARCHAR(1024),
    footer_text VARCHAR(255),
    copyright_notice VARCHAR(255),
    seo_title VARCHAR(255),
    seo_description TEXT,
    og_image_url VARCHAR(1024),
    is_published BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message LONGTEXT NOT NULL,
    phone VARCHAR(64),
    honeypot VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(128),
    user_agent VARCHAR(512),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS uploaded_files (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    original_filename VARCHAR(255) NOT NULL,
    stored_file_name VARCHAR(255) NOT NULL UNIQUE,
    file_url VARCHAR(1024) NOT NULL,
    category VARCHAR(64),
    content_type VARCHAR(128),
    file_size BIGINT,
    storage_provider VARCHAR(64) DEFAULT 'PERSISTENT_DISK',
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

