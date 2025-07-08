package com.example.back.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Schema(description = "로그인 응답 DTO")
public class UserLoginResponse {

    @Schema(description = "사용자 ID (고유 식별자)", example = "1")
    private String userId;

    @Schema(description = "JWT 인증 토큰")
    private String token;

    @Schema(description = "사용자 상세 정보")
    private UserInfoResponse userInfo;

    @Schema(description = "응답 메시지", example = "로그인 성공")
    private String message;
}
