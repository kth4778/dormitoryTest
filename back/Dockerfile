FROM gradle:8.5-jdk21 AS builder

WORKDIR /app

# gradlew 먼저 복사하고 실행 권한 부여
COPY gradlew .
RUN chmod +x gradlew

# gradle 폴더 복사 (wrapper 설정 포함)
COPY gradle gradle

# 전체 프로젝트 복사
COPY . .

# gradlew 빌드 실행
RUN ./gradlew clean build --no-daemon --stacktrace

# [2단계] 실행 이미지
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/build/libs/back-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
