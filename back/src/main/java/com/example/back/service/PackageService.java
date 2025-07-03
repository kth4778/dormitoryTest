package com.example.back.service;

import com.example.back.domain.User;
import com.example.back.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository packageRepository;

    public long getPendingPackageCount(User user) {
        return packageRepository.countByUserAndStatus(user, "PENDING");
    }
}
