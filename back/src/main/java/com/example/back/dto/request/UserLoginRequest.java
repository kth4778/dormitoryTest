package com.example.back.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "로그인 요청 DTO")
public class UserLoginRequest {

    @Schema(description = "이메일 주소", example = "user@example.com")
    private String email;

    @Schema(description = "비밀번호", example = "Password123!")
    private String password;
}
