package com.example.back.service;

import com.example.back.domain.User;
import com.example.back.dto.response.HomeDashboardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final UserService userService;
    private final MealService mealService;
    private final PackageService packageService;
    private final ReservationService reservationService;
    private final NoticeService noticeService;

    public HomeDashboardResponse getDashboardData(String userId) {
        User user = userService.findByUserId(userId);

        HomeDashboardResponse.UserInfo userInfo = HomeDashboardResponse.UserInfo.builder()
                .name(user.getName())
                .room(user.getRoom())
                .build();

        HomeDashboardResponse.MealInfo mealInfo = mealService.getTodayMeal()
                .map(meal -> HomeDashboardResponse.MealInfo.builder()
                        .breakfast(meal.getBreakfast())
                        .lunch(meal.getLunch())
                        .dinner(meal.getDinner())
                        .build())
                .orElse(null);

        long pendingPackageCount = packageService.getPendingPackageCount(user);

        HomeDashboardResponse.ReservationInfo reservationInfo = reservationService.getUpcomingReservation(user)
                .map(reservation -> HomeDashboardResponse.ReservationInfo.builder()
                        .type(reservation.getType())
                        .room(reservation.getRoom())
                        .time(reservation.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm")) + "-" + reservation.getEndTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                        .build())
                .orElse(null);

        return HomeDashboardResponse.builder()
                .userInfo(userInfo)
                .mealInfo(mealInfo)
                .pendingPackageCount(pendingPackageCount)
                .upcomingReservation(reservationInfo)
                .recentNotices(noticeService.getRecentNotices().stream()
                        .map(notice -> HomeDashboardResponse.NoticeInfo.builder()
                                .id(notice.getId())
                                .title(notice.getTitle())
                                .date(notice.getDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                                .important(notice.isImportant())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
