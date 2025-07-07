package com.example.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    // ❌ CORS 설정은 SecurityConfig에서 처리하므로 이곳에서는 설정하지 않음
}
