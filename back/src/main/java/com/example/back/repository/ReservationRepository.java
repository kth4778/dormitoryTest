package com.example.back.repository;

import com.example.back.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findFirstByUserAndStartTimeAfterOrderByStartTimeAsc(com.example.back.domain.User user, LocalDateTime now);
}
