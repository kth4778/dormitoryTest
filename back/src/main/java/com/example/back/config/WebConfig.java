package com.example.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://dormitory-test.vercel.app") // ✅ 정확한 Vercel 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 🔥 OPTIONS 포함
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
