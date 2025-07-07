# ✅ 1단계: Gradle로 빌드 (빌더 스테이지)
FROM gradle:7.6.0-jdk17 AS builder
WORKDIR /home/gradle/project

# 🔧 [1] build.gradle, settings.gradle이 프로젝트 루트에 실제로 있는지 확인
# 없거나 이름이 다르면 COPY 실패함
COPY back/build.gradle .
COPY back/settings.gradle .
COPY back/gradle gradle
COPY back/src src
                   # 🔧 src 디렉토리가 /src에 있는지 확인

# 🔧 [2] 필요한 경우 --stacktrace 옵션 추가해 디버깅 쉽게 만들 수 있음
RUN gradle build --no-daemon --stacktrace

# ✅ 2단계: 실제 실행 환경
FROM openjdk:17-jdk-slim
WORKDIR /app

# 🔧 [3] 생성된 JAR 파일 이름이 app.jar로 고정됨
# JAR 파일 이름이 예: back-0.0.1-SNAPSHOT.jar 이라면, 직접 파일명을 넣어도 됨
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

# 실행 명령
ENTRYPOINT ["java", "-jar", "app.jar"]
