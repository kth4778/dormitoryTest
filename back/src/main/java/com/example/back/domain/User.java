package com.example.back.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users") // 'user'는 예약어일 수 있으므로 'users'로 변경
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // 비밀번호는 암호화하여 저장해야 합니다.

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String phone;

    @Column(name = "student_num", nullable = false, unique = true)
    private String studentNum; // 학번

    @Column(nullable = false)
    private String college; // 단과대학

    @Column(nullable = false)
    private String major; // 전공

    // 프로필 이미지 URL (선택 사항)
    @Column(name = "profile_image_url")
    private String profileImageUrl;

    // 역할 (학생, 관리자, 슈퍼관리자)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public enum Role {
        STUDENT, ADMIN, SUPER_ADMIN
    }
}
