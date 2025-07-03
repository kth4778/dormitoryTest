# 기숙사 앱 API 명세서

## 회원 관리 (학생)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 회원가입 | POST | /api/signup | { "email": "string", "password": "string", "name": "string", "phone": "string", "student_num": "string", "college": "string", "major": "string" } | { "message": "회원가입 성공" } | 학번, 이메일 중복 체크 필요 | 비회원 | Not Started |
| 로그인 | POST | /api/login | { "email": "string", "password": "string" } | { "user_id": "string", "token": "string", "user_info": {}, "message": "로그인 성공" } | JWT 토큰 발급 | 비회원 | Not Started |
| 로그아웃 | POST | /api/logout | {} | { "message": "로그아웃 성공" } | 토큰 무효화 | 학생 | Not Started |
| 아이디 찾기 | POST | /api/find-id | { "name": "string", "phone": "string" } | { "email": "string", "message": "아이디 찾기 성공" } | 휴대폰 인증 후 제공 | 비회원 | Not Started |
| 비밀번호 찾기 | POST | /api/find-password | { "email": "string", "phone": "string" } | { "message": "임시 비밀번호 발송 완료" } | 임시 비밀번호 발송 | 비회원 | Not Started |
| 비밀번호 변경 | PUT | /api/change-password | { "current_password": "string", "new_password": "string" } | { "message": "비밀번호 변경 성공" } | 현재 비밀번호 확인 필요 | 학생 | Not Started |
| 이메일 중복 확인 | GET | /api/check-email?email={email} | - | { "available": "boolean", "message": "사용 가능한 이메일" } | 회원가입 시 사용 | 비회원 | Not Started |
| 휴대폰 인증 | POST | /api/verify-phone | { "phone": "string", "verification_code": "string" } | { "verified": "boolean", "message": "인증 성공" } | SMS 인증 코드 확인 | 비회원 | Not Started |
| 회원 정보 조회 | GET | /api/users/profile | - | { "user_info": {}, "message": "조회 성공" } | 본인 정보만 조회 | 학생 | Not Started |
| 회원 정보 수정 | PUT | /api/users/profile | { "name": "string", "phone": "string", "email": "string", "college": "string", "major": "string" } | { "user_info": {}, "message": "수정 성공" } | 이메일 변경 시 재인증 | 학생 | Not Started |
| 프로필 사진 수정 | PUT | /api/users/profile/image | { "image_file": "file" } | { "image_url": "string", "message": "업로드 성공" } | 파일 업로드, 이미지 리사이징 | 학생 | Not Started |
| 프로필 사진 초기화 | DELETE | /api/users/profile/image | - | { "message": "초기화 성공" } | 기본 이미지로 변경 | 학생 | Not Started |
| 회원 탈퇴 | DELETE | /api/users/account | { "password": "string" } | { "message": "탈퇴 성공" } | 비밀번호 확인 후 처리 | 학생 | Not Started |

## 입주자 관리 (관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 입주자 등록 | POST | /api/admin/residents | { "student_id": "string", "name": "string", "room_number": "string", "check_in_date": "string" } | { "resident_id": "string", "message": "등록 성공" } | 방 번호 중복 체크 | 관리자 | Not Started |
| 입주자 목록 조회 | GET | /api/admin/residents?page={page}&limit={limit}&search={search}&status={status} | - | { "residents": [], "total_count": "number", "message": "조회 성공" } | 페이징, 검색, 상태별 필터 | 관리자 | Not Started |
| 입주자 상세 조회 | GET | /api/admin/residents/{id} | - | { "resident_info": {}, "message": "조회 성공" } | 특정 입주자 정보 | 관리자 | Not Started |
| 입주자 정보 수정 | PUT | /api/admin/residents/{id} | { "name": "string", "room_number": "string", "phone": "string", "email": "string" } | { "resident_info": {}, "message": "수정 성공" } | 방 번호 변경 시 중복 체크 | 관리자 | Not Started |
| 입주자 삭제 | DELETE | /api/admin/residents/{id} | - | { "message": "삭제 성공" } | 완전 삭제 (퇴사 처리와 구분) | 관리자 | Not Started |
| 입주 상태 변경 | PUT | /api/admin/residents/{id}/status | { "status": "string", "check_out_date": "string" } | { "resident_info": {}, "message": "상태 변경 성공" } | 입주/퇴사 상태 변경 | 관리자 | Not Started |

## 편의시설 예약 (학생)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 세탁실 예약 | POST | /api/reservations/laundry | { "date": "string", "start_time": "string", "machine_type": "string" } | { "reservation_id": "string", "message": "예약 성공" } | 2시간 단위, 중복 예약 체크 | 학생 | Not Started |
| 스터디룸 예약 | POST | /api/reservations/study | { "date": "string", "start_time": "string", "room_number": "string" } | { "reservation_id": "string", "message": "예약 성공" } | 2시간 단위, 방별 예약 관리 | 학생 | Not Started |
| 내 예약 목록 조회 | GET | /api/reservations/my?page={page}&limit={limit}&status={status} | - | { "reservations": [], "total_count": "number", "message": "조회 성공" } | 본인 예약만 조회, 상태별 필터 | 학생 | Not Started |
| 예약 상세 조회 | GET | /api/reservations/{id} | - | { "reservation_info": {}, "message": "조회 성공" } | 예약 상세 정보 | 학생 | Not Started |
| 예약 취소 | DELETE | /api/reservations/{id} | - | { "message": "취소 성공" } | 예약 시간 1시간 전까지 취소 가능 | 학생 | Not Started |

## 편의시설 관리 (관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 예약 현황 전체 조회 | GET | /api/admin/reservations?page={page}&limit={limit}&date={date}&facility={facility} | - | { "reservations": [], "total_count": "number", "message": "조회 성공" } | 모든 학생 예약 현황, 날짜별/시설별 필터 | 관리자 | Not Started |
| 예약 강제 취소 | DELETE | /api/admin/reservations/{id} | { "cancel_reason": "string" } | { "message": "강제 취소 성공" } | 문제 상황 시 관리자 권한으로 취소 | 관리자 | Not Started |

## 식당 (학생/관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 오늘의 식단 조회 | GET | /api/meals/today | - | { "today_meals": {}, "message": "조회 성공" } | 당일 식단 정보 | 학생/관리자 | Not Started |
| 주간 식단표 조회 | GET | /api/meals/weekly?start_date={start_date} | - | { "weekly_meals": [], "message": "조회 성공" } | 일주일 식단 정보 | 학생/관리자 | Not Started |

## 식당 관리 (관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 식단 등록/수정 | POST | /api/admin/meals | { "date": "string", "meal_type": "string", "menu_items": [], "price": "number" } | { "meal_id": "string", "message": "등록 성공" } | 날짜별 식단 등록 및 수정 | 관리자 | Not Started |

## 택배우편 (학생)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 수령 대기 택배 목록 | GET | /api/packages/pending | - | { "packages": [], "total_count": "number", "message": "조회 성공" } | 본인 택배만 조회 | 학생 | Not Started |
| 수령 완료 처리 | PUT | /api/packages/{id}/received | { "received_date": "string" } | { "message": "수령 완료 처리 성공" } | 택배 수령 확인 | 학생 | Not Started |

## 택배우편 관리 (관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 택배 등록 | POST | /api/admin/packages | { "recipient_name": "string", "recipient_student_id": "string", "sender": "string", "package_type": "string", "arrival_date": "string" } | { "package_id": "string", "message": "등록 성공" } | 택배 도착 시 등록 | 관리자 | Not Started |
| 택배 수정/삭제 | PUT | /api/admin/packages/{id} | { "recipient_name": "string", "sender": "string", "package_type": "string" } | { "package_info": {}, "message": "수정 성공" } | 잘못 등록된 택배 수정 | 관리자 | Not Started |
| 택배 삭제 | DELETE | /api/admin/packages/{id} | - | { "message": "삭제 성공" } | 잘못 등록된 택배 삭제 | 관리자 | Not Started |
| 전체 택배 현황 조회 | GET | /api/admin/packages?page={page}&limit={limit}&status={status}&search={search} | - | { "packages": [], "total_count": "number", "message": "조회 성공" } | 전체 택배 현황 관리 | 관리자 | Not Started |

## 공지사항 (학생/관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 공지 목록 조회 | GET | /api/notices?page={page}&limit={limit}&search={search} | - | { "notices": [], "total_count": "number", "message": "조회 성공" } | 페이징, 검색 기능 | 학생/관리자 | Not Started |
| 공지 상세 보기 | GET | /api/notices/{id} | - | { "notice_info": {}, "message": "조회 성공" } | 공지사항 상세 내용 | 학생/관리자 | Not Started |

## 공지사항 관리 (관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 공지 작성 | POST | /api/admin/notices | { "title": "string", "content": "string", "important": "boolean", "publish_date": "string" } | { "notice_id": "string", "message": "작성 성공" } | 중요 공지 여부 설정 가능 | 관리자 | Not Started |
| 공지 수정 | PUT | /api/admin/notices/{id} | { "title": "string", "content": "string", "important": "boolean" } | { "notice_info": {}, "message": "수정 성공" } | 기존 공지사항 수정 | 관리자 | Not Started |
| 공지 삭제 | DELETE | /api/admin/notices/{id} | - | { "message": "삭제 성공" } | 공지사항 삭제 | 관리자 | Not Started |

## 시스템 관리 (슈퍼 관리자)

| 기능 | HttpMethod | EndPoint | Request | Response | 기타 | 권한 | Status |
|------|------------|----------|---------|----------|------|------|--------|
| 관리자 계정 등록 | POST | /api/super/admin | { "email": "string", "password": "string", "name": "string", "role": "string" } | { "admin_id": "string", "message": "등록 성공" } | 관리자 계정 생성 | 슈퍼관리자 | Not Started |
| 관리자 계정 목록 | GET | /api/super/admin?page={page}&limit={limit} | - | { "admins": [], "total_count": "number", "message": "조회 성공" } | 관리자 계정 목록 조회 | 슈퍼관리자 | Not Started |
| 관리자 계정 삭제 | DELETE | /api/super/admin/{id} | - | { "message": "삭제 성공" } | 관리자 계정 삭제 | 슈퍼관리자 | Not Started |