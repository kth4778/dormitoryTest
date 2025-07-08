package com.example.back.controller;

import com.example.back.dto.request.UserSignUpRequest;
import com.example.back.dto.request.UserLoginRequest;
import com.example.back.dto.response.UserSignUpResponse;
import com.example.back.dto.response.UserLoginResponse;
import com.example.back.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

@Tag(name = "사용자 인증", description = "회원가입, 로그인 등 사용자 인증 관련 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공",
                    content = @Content(schema = @Schema(implementation = UserSignUpResponse.class))),
            @ApiResponse(responseCode = "400", description = "입력값 유효성 검사 실패 또는 이메일/학번/휴대폰 번호 중복")
    })
    @PostMapping("/signup")
    public ResponseEntity<UserSignUpResponse> signUp(@Valid @RequestBody UserSignUpRequest request) {
        userService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UserSignUpResponse("회원가입 성공"));
    }

    @Operation(summary = "로그인", description = "이메일과 비밀번호로 로그인하고 JWT 토큰을 발급받습니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공",
                    content = @Content(schema = @Schema(implementation = UserLoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "이메일 또는 비밀번호가 잘못됨")
    })
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest request) {
        UserLoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "이메일 중복 확인", description = "회원가입 시 이메일 중복 여부를 확인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "확인 성공"),
    })
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmailDuplication(
            @Parameter(description = "중복 확인할 이메일 주소", required = true, example = "test@example.com")
            @RequestParam String email) {
        boolean isDuplicated = userService.checkEmailDuplication(email);
        Map<String, Object> response = new HashMap<>();
        if (isDuplicated) {
            response.put("available", false);
            response.put("message", "사용 불가능한 이메일입니다.");
        } else {
            response.put("available", true);
            response.put("message", "사용 가능한 이메일입니다.");
        }
        return ResponseEntity.ok(response);
    }

    // 유효성 검사 실패 시 예외 처리
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    // 일반적인 IllegalArgumentException 처리 (예: 이메일/학번 중복)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String, String> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("error", ex.getMessage());
        return errors;
    }
}
