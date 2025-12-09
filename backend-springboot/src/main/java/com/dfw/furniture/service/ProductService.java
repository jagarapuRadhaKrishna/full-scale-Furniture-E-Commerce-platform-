package com.dfw.furniture.service;

import com.dfw.furniture.model.Product;
import com.dfw.furniture.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Cacheable(value = "products", key = "#pageable.pageNumber")
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findByIsActiveTrue(pageable);
    }

    public Product getProductById(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Increment views
        product.setViews(product.getViews() + 1);
        productRepository.save(product);
        
        return product;
    }

    public Page<Product> getProductsByCategory(UUID categoryId, Pageable pageable) {
        return productRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    public Page<Product> searchProducts(String search, Pageable pageable) {
        return productRepository.searchProducts(search, pageable);
    }

    public Page<Product> filterByPriceRange(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        return productRepository.findByPriceRange(minPrice, maxPrice, pageable);
    }

    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(UUID id, Product updatedProduct) {
        Product product = getProductById(id);
        
        // Update fields
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setSalePrice(updatedProduct.getSalePrice());
        product.setStockQuantity(updatedProduct.getStockQuantity());
        // Add more fields as needed
        
        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(UUID id) {
        Product product = getProductById(id);
        product.setIsActive(false);
        productRepository.save(product);
    }
}
