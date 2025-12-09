package com.dfw.furniture.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(unique = true)
    private String sku;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "sale_price", precision = 10, scale = 2)
    private BigDecimal salePrice;

    @Column(name = "cost_price", precision = 10, scale = 2)
    private BigDecimal costPrice;

    @Column(name = "stock_quantity")
    private Integer stockQuantity = 0;

    @Column(name = "low_stock_threshold")
    private Integer lowStockThreshold = 5;

    private String material;

    private String color;

    private String brand;

    @Column(name = "warranty_period")
    private String warrantyPeriod;

    @Column(name = "care_instructions", columnDefinition = "TEXT")
    private String careInstructions;

    @Column(name = "has_360_view")
    private Boolean has360View = false;

    @Column(name = "model_3d_url")
    private String model3dUrl;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_customizable")
    private Boolean isCustomizable = false;

    @Column(name = "assembly_required")
    private Boolean assemblyRequired = false;

    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Column(name = "total_reviews")
    private Integer totalReviews = 0;

    @Column(name = "total_sales")
    private Integer totalSales = 0;

    @Column(name = "views")
    private Integer views = 0;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_description", columnDefinition = "TEXT")
    private String seoDescription;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
