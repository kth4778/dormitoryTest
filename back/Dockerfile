FROM gradle:8.5-jdk21 AS builder

WORKDIR /app

# Gradle Wrapper 관련 파일 복사
COPY gradlew .
COPY gradle gradle

# 실행 권한 부여
RUN chmod +x gradlew

# 전체 프로젝트 복사
COPY . .

# Gradle 빌드 실행
RUN ./gradlew clean build --no-daemon --stacktrace

# [2단계] 실행용 이미지
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/build/libs/back-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
