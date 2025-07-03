package com.example.back.dto.response;

import com.example.back.domain.*;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class HomeDashboardResponse {
    private UserInfo userInfo;
    private MealInfo mealInfo;
    private long pendingPackageCount;
    private ReservationInfo upcomingReservation;
    private List<NoticeInfo> recentNotices;

    @Getter
    @Builder
    public static class UserInfo {
        private String name;
        private String room;
    }

    @Getter
    @Builder
    public static class MealInfo {
        private String breakfast;
        private String lunch;
        private String dinner;
    }

    @Getter
    @Builder
    public static class ReservationInfo {
        private String type;
        private String room;
        private String time;
    }

    @Getter
    @Builder
    public static class NoticeInfo {
        private Long id;
        private String title;
        private String date;
        private boolean important;
    }
}
