package com.dfw.furniture.controller;

import com.dfw.furniture.dto.ApiResponse;
import com.dfw.furniture.model.Product;
import com.dfw.furniture.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) UUID category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") 
                ? Sort.by(sortBy).ascending() 
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productsPage;

        if (search != null && !search.isEmpty()) {
            productsPage = productService.searchProducts(search, pageable);
        } else if (category != null) {
            productsPage = productService.getProductsByCategory(category, pageable);
        } else if (minPrice != null || maxPrice != null) {
            productsPage = productService.filterByPriceRange(minPrice, maxPrice, pageable);
        } else {
            productsPage = productService.getAllProducts(pageable);
        }

        Map<String, Object> response = Map.of(
                "products", productsPage.getContent(),
                "currentPage", productsPage.getNumber(),
                "totalItems", productsPage.getTotalElements(),
                "totalPages", productsPage.getTotalPages()
        );

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProduct(@PathVariable UUID id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<Product>> getProductBySlug(@PathVariable String slug) {
        Product product = productService.getProductBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(product));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Product>>> getFeaturedProducts() {
        List<Product> products = productService.getFeaturedProducts();
        return ResponseEntity.ok(ApiResponse.success(products));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(ApiResponse.success("Product created successfully", createdProduct));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable UUID id,
            @RequestBody Product product
    ) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", updatedProduct));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }
}
