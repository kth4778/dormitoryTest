package com.example.back.repository;

import com.example.back.domain.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {
    long countByUserAndStatus(com.example.back.domain.User user, String status);
}
