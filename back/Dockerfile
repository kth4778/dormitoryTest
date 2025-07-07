# [1단계] 빌드 이미지 (JDK 21 + Gradle Wrapper 사용)
FROM gradle:8.5-jdk21 AS builder

WORKDIR /app

# Gradle Wrapper 복사 (캐시 활용)
COPY gradlew .
COPY gradle gradle

# 프로젝트 전체 복사
COPY . .

# Gradle Wrapper로 빌드
RUN ./gradlew clean build --no-daemon --stacktrace

# [2단계] 실행용 이미지
FROM eclipse-temurin:21-jdk

WORKDIR /app

# 빌드된 jar 복사 (명확하게 back-0.0.1-SNAPSHOT.jar만)
COPY --from=builder /app/build/libs/back-0.0.1-SNAPSHOT.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
