package com.example.back.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Schema(description = "회원가입 응답 DTO")
public class UserSignUpResponse {

    @Schema(description = "응답 메시지", example = "회원가입 성공")
    private String message;
}
