package com.example.back.service;

import com.example.back.domain.Reservation;
import com.example.back.domain.User;
import com.example.back.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public Optional<Reservation> getUpcomingReservation(User user) {
        return reservationRepository.findFirstByUserAndStartTimeAfterOrderByStartTimeAsc(user, LocalDateTime.now());
    }
}
