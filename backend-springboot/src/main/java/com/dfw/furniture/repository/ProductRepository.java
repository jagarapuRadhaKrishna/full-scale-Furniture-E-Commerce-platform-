package com.dfw.furniture.repository;

import com.dfw.furniture.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    Optional<Product> findBySlug(String slug);
    Page<Product> findByIsActiveTrue(Pageable pageable);
    Page<Product> findByCategoryIdAndIsActiveTrue(UUID categoryId, Pageable pageable);
    List<Product> findByIsFeaturedTrueAndIsActiveTrue();
    
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> findByPriceRange(
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );
    
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Product> searchProducts(@Param("search") String search, Pageable pageable);
}
