package com.example.back.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@Schema(description = "홈 대시보드 응답 DTO")
public class HomeDashboardResponse {

    @Schema(description = "로그인한 사용자 정보")
    private UserInfo userInfo;

    @Schema(description = "오늘의 식단 정보")
    private MealInfo mealInfo;

    @Schema(description = "미수령 택배 개수", example = "2")
    private long pendingPackageCount;

    @Schema(description = "가장 가까운 예약 정보")
    private ReservationInfo upcomingReservation;

    @Schema(description = "최근 공지사항 목록 (최대 5개)")
    private List<NoticeInfo> recentNotices;

    @Getter
    @Builder
    @Schema(description = "대시보드 내 사용자 정보")
    public static class UserInfo {
        @Schema(description = "사용자 이름", example = "홍길동")
        private String name;

        @Schema(description = "사용자 호실", example = "203호")
        private String room;
    }

    @Getter
    @Builder
    @Schema(description = "대시보드 내 식단 정보")
    public static class MealInfo {
        @Schema(description = "아침 식사 메뉴", example = "백미밥, 김치찌개, 계란말이")
        private String breakfast;

        @Schema(description = "점심 식사 메뉴", example = "짜장면, 단무지")
        private String lunch;

        @Schema(description = "저녁 식사 메뉴", example = "카레라이스, 깍두기")
        private String dinner;
    }

    @Getter
    @Builder
    @Schema(description = "대시보드 내 예약 정보")
    public static class ReservationInfo {
        @Schema(description = "예약 종류", example = "스터디룸")
        private String type;

        @Schema(description = "예약한 공간", example = "스터디룸 A")
        private String room;

        @Schema(description = "예약 시간", example = "14:00-16:00")
        private String time;
    }

    @Getter
    @Builder
    @Schema(description = "대시보드 내 공지사항 정보")
    public static class NoticeInfo {
        @Schema(description = "공지사항 ID", example = "101")
        private Long id;

        @Schema(description = "공지사항 제목", example = "[필독] 정기 소방 점검 안내")
        private String title;

        @Schema(description = "게시일", example = "2024.07.28")
        private String date;

        @Schema(description = "중요 공지 여부", example = "true")
        private boolean important;
    }
}
