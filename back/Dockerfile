# [1단계] 빌드 이미지 - Gradle + JDK 21
FROM gradle:8.5-jdk21 AS builder

WORKDIR /app

# gradlew 실행 권한 설정
COPY gradlew .
RUN chmod +x gradlew

# Gradle wrapper 설정 복사
COPY gradle gradle

# 전체 프로젝트 복사
COPY . .

# 테스트 생략하고 빌드
RUN ./gradlew clean build -x test --no-daemon --stacktrace

# [2단계] 실제 실행 이미지 - 경량화된 JDK만 사용
FROM eclipse-temurin:21-jdk

WORKDIR /app

# 빌드된 jar 복사
COPY --from=builder /app/build/libs/back-0.0.1-SNAPSHOT.jar app.jar

# Spring Boot 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
