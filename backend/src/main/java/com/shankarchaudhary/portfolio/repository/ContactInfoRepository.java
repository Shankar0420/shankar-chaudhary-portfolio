package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactInfoRepository extends JpaRepository<ContactInfo, Long> {
}

