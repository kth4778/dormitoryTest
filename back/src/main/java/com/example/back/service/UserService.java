package com.example.back.service;

import com.example.back.domain.User;
import com.example.back.dto.request.UserSignUpRequest;
import com.example.back.dto.request.UserLoginRequest;
import com.example.back.dto.response.UserInfoResponse;
import com.example.back.dto.response.UserLoginResponse;
import com.example.back.repository.UserRepository;
import com.example.back.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public void signUp(UserSignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (userRepository.existsByStudentNum(request.getStudentNum())) {
            throw new IllegalArgumentException("이미 등록된 학번입니다.");
        }
        // 휴대폰 번호 중복 체크 추가
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("이미 등록된 휴대폰 번호입니다.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // 비밀번호 암호화
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setStudentNum(request.getStudentNum());
        user.setCollege(request.getCollege());
        user.setMajor(request.getMajor());
        user.setRole(User.Role.STUDENT); // 기본 역할은 학생

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public UserLoginResponse login(UserLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 잘못되었습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 잘못되었습니다.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        UserInfoResponse userInfo = new UserInfoResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getPhone(),
                user.getStudentNum(),
                user.getCollege(),
                user.getMajor(),
                user.getProfileImageUrl()
        );

        return new UserLoginResponse(String.valueOf(user.getId()), token, userInfo, "로그인 성공");
    }

    @Transactional(readOnly = true)
    public boolean checkEmailDuplication(String email) {
        return userRepository.existsByEmail(email);
    }
}