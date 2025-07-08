package com.example.back.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "회원가입 요청 DTO")
public class UserSignUpRequest {

    @Schema(description = "이메일 주소", example = "user@example.com")
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "유효한 이메일 주소를 입력해주세요.")
    private String email;

    @Schema(description = "비밀번호 (8자 이상, 영문, 숫자, 특수문자 포함)", example = "Password123!")
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-\\=\\[\\]{};:'\"\\\\|,.<>/?]).{8,}",
            message = "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.")
    private String password;

    @Schema(description = "사용자 이름", example = "홍길동")
    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;

    @Schema(description = "휴대폰 번호 (하이픈 제외)", example = "01012345678")
    @NotBlank(message = "휴대폰 번호는 필수 입력 값입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$", message = "유효한 휴대폰 번호를 입력해주세요.")
    private String phone;

    @Schema(description = "학번 (7자리)", example = "2024123")
    @NotBlank(message = "학번은 필수 입력 값입니다.")
    @Size(min = 7, max = 7, message = "학번은 7자리여야 합니다.")
    private String studentNum;

    @Schema(description = "단과대학", example = "IT대학")
    @NotBlank(message = "단과대학은 필수 입력 값입니다.")
    private String college;

    @Schema(description = "전공", example = "컴퓨터공학과")
    @NotBlank(message = "전공은 필수 입력 값입니다.")
    private String major;
}