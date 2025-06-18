package com.example.infrastructure.category.persistence;

import com.example.domain.Category;
import com.example.infrastructure.MySQLGatewayTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

@MySQLGatewayTest
class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void testInjectDependencies() {
        assertNotNull(categoryRepository);
    }

    @Test
    public void testShouldReturnExceptionWhenNameIsRequired() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var category = Category.with(expectedName, expectedDescription, expectedIsActive);
        var categoryJpaEntity = CategoryJpaEntity.from(category);
        categoryJpaEntity.setName(null);
        assertThrows(Exception.class, () -> categoryRepository.save(categoryJpaEntity));
    }

    @Test
    public void testShouldReturnExceptionWhenCreatedAtIsRequired() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var category = Category.with(expectedName, expectedDescription, expectedIsActive);
        var categoryJpaEntity = CategoryJpaEntity.from(category);
        categoryJpaEntity.setCreatedAt(null);
        assertThrows(Exception.class, () -> categoryRepository.save(categoryJpaEntity));
    }

    @Test
    public void testShouldReturnExceptionWhenUpdatedAtIsRequired() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var category = Category.with(expectedName, expectedDescription, expectedIsActive);
        var categoryJpaEntity = CategoryJpaEntity.from(category);
        categoryJpaEntity.setUpdatedAt(null);
        assertThrows(Exception.class, () -> categoryRepository.save(categoryJpaEntity));
    }
}
