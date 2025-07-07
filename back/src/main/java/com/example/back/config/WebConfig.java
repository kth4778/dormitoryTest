package com.example.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://dormitory-test-git-main-kth4778s-projects.vercel.app") // ✅ Vercel 도메인 입력
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
