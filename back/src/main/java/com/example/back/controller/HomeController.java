package com.example.back.controller;

import com.example.back.dto.response.HomeDashboardResponse;
import com.example.back.service.HomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "홈", description = "홈 화면 관련 API")
@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @Operation(summary = "홈 대시보드 조회", description = "로그인 후 홈 화면에 필요한 모든 데이터를 조회합니다.",
            security = @SecurityRequirement(name = "bearerAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회 성공",
                    content = @Content(schema = @Schema(implementation = HomeDashboardResponse.class))),
            @ApiResponse(responseCode = "401", description = "인증 실패 (유효하지 않은 토큰)"),
            @ApiResponse(responseCode = "403", description = "권한 없음")
    })
    @GetMapping("/dashboard")
    public ResponseEntity<HomeDashboardResponse> getDashboard(@AuthenticationPrincipal String userId) {
        HomeDashboardResponse dashboardData = homeService.getDashboardData(userId);
        return ResponseEntity.ok(dashboardData);
    }
}
