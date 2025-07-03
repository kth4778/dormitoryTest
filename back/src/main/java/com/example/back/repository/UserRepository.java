package com.example.back.repository;

import com.example.back.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByStudentNum(String studentNum);
    Optional<User> findByPhone(String phone);
    boolean existsByEmail(String email);
    boolean existsByStudentNum(String studentNum);
    boolean existsByPhone(String phone);
}
