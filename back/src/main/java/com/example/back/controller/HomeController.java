package com.example.back.controller;

import com.example.back.dto.response.HomeDashboardResponse;
import com.example.back.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping("/dashboard")
    public ResponseEntity<HomeDashboardResponse> getDashboard(@AuthenticationPrincipal String userId) {
        HomeDashboardResponse dashboardData = homeService.getDashboardData(userId);
        return ResponseEntity.ok(dashboardData);
    }
}
