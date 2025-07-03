package com.example.back.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpRequest {

    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "유효한 이메일 주소를 입력해주세요.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    // 8자 이상, 영문, 숫자, 특수문자를 모두 포함
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-\\=\\[\\]{};:'\"\\\\|,.<>/?]).{8,}$",
            message = "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.")
    private String password;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;

    @NotBlank(message = "휴대폰 번호는 필수 입력 값입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$",
            message = "유효한 휴대폰 번호를 입력해주세요. (예: 01012345678)")
    private String phone;

    @NotBlank(message = "학번은 필수 입력 값입니다.")
    @Size(min = 7, max = 7, message = "학번은 7자리여야 합니다.")
    private String studentNum;

    @NotBlank(message = "단과대학은 필수 입력 값입니다.")
    private String college;

    @NotBlank(message = "전공은 필수 입력 값입니다.")
    private String major;
}