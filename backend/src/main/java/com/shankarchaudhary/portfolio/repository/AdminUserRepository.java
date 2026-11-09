package com.shankarchaudhary.portfolio.repository;

import com.shankarchaudhary.portfolio.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByMobileNumber(String mobileNumber);
}

