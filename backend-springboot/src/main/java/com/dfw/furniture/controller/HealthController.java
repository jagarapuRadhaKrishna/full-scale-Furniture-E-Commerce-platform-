package com.dfw.furniture.controller;

import com.dfw.furniture.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> health = Map.of(
                "status", "UP",
                "application", "DFW Furniture Backend - Spring Boot",
                "version", "1.0.0",
                "timestamp", LocalDateTime.now()
        );
        return ResponseEntity.ok(ApiResponse.success(health));
    }

    @GetMapping("/api")
    public ResponseEntity<ApiResponse<Map<String, Object>>> apiInfo() {
        Map<String, Object> info = Map.of(
                "name", "DFW Furniture API",
                "version", "1.0.0",
                "description", "Spring Boot REST API for DFW Furniture e-commerce",
                "endpoints", Map.of(
                        "auth", "/api/auth",
                        "products", "/api/products",
                        "orders", "/api/orders",
                        "users", "/api/users"
                )
        );
        return ResponseEntity.ok(ApiResponse.success(info));
    }
}
