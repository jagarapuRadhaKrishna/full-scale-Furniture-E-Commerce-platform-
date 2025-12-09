package com.dfw.furniture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableJpaAuditing
public class FurnitureApplication {

    public static void main(String[] args) {
        SpringApplication.run(FurnitureApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("🚀 DFW Furniture Backend - Spring Boot");
        System.out.println("📍 Server running on: http://localhost:8080");
        System.out.println("📚 API Documentation: http://localhost:8080/api");
        System.out.println("💚 Health Check: http://localhost:8080/health");
        System.out.println("========================================\n");
    }
}
