package com.example.application.category.update;

import com.example.IntegrationTest;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.exceptions.DomainException;
import com.example.infrastructure.category.persistence.CategoryJpaEntity;
import com.example.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@IntegrationTest
public class UpdateCategoryIntegrationTest {
    @Autowired
    private UpdateCategoryUsecase updateCategoryUsecase;

    @Autowired
    private CategoryRepository categoryRepository;

    @SpyBean
    private CategoryGateway categoryGateway;

    @Test
    public void testUpdateCategory() {
        var expectedCategory = Category.with("any-name", null, true);
        var expectedName = "any-name-2";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var expectedId = expectedCategory.getId();
        var expectedUpdatedAt = expectedCategory.getUpdatedAt();

        categoryRepository.saveAndFlush(CategoryJpaEntity.from(expectedCategory));

        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, expectedDescription, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).get();
        var category = categoryRepository.findById(output.id()).get();

        assertNotNull(output);
        assertNotNull(output.id());
        assertEquals(expectedName, category.getName());
        assertEquals(expectedDescription, category.getDescription());
        assertNotEquals(category.getCreatedAt(), category.getUpdatedAt());
        assertNotEquals(expectedUpdatedAt, category.getUpdatedAt());
    }

    @Test
    public void testUpdateCategoryToInactive() {
        var expectedCategory = Category.with("any-name", null, true);
        var expectedName = "any-name-2";
        var expectedDescription = "any-description";
        var expectedIsActive = false;
        var expectedId = expectedCategory.getId();
        var expectedUpdatedAt = expectedCategory.getUpdatedAt();

        categoryRepository.saveAndFlush(CategoryJpaEntity.from(expectedCategory));

        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, expectedDescription, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).get();
        var category = categoryRepository.findById(output.id()).get();

        assertNotNull(output);
        assertNotNull(output.id());
        assertEquals(expectedName, category.getName());
        assertEquals(expectedDescription, category.getDescription());
        assertFalse(category.isActive());
        assertNotEquals(category.getCreatedAt(), category.getUpdatedAt());
        assertNotEquals(expectedUpdatedAt, category.getUpdatedAt());
        assertNotNull(category.getDeletedAt());
    }

    @Test
    public void testUpdateCategoryNotFound() {
        var expectedCategory = Category.with("any-name", "any-description", true);
        var expectedName = "any-name-2";
        var expectedIsActive = true;
        var expectedId = expectedCategory.getId();
        var expectedErr = "category not found";
        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, null, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).getLeft();
        assertEquals(expectedErr, output.getErrors().getFirst().message());
    }

    @Test
    public void testUpdateCategoryInvalidName() {
        var expectedCategory = Category.with("any-name", "any-description", true);
        var expectedName = "";
        var expectedIsActive = true;
        var expectedId = expectedCategory.getId();
        var expectedErr = "name is required";

        categoryRepository.saveAndFlush(CategoryJpaEntity.from(expectedCategory));

        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, null, expectedIsActive);
        var exception = assertThrows(DomainException.class, () -> {
            updateCategoryUsecase.execute(input);
        });

        Mockito.verify(categoryGateway, Mockito.times(0)).update(null);
        assertEquals(expectedErr, exception.getErrors().getFirst().message());
    }

    @Test
    public void testUpdateCategoryGatewayException() {
        var expectedCategory = Category.with("any-name", "any-description", true);
        var expectedName = "any-name-2";
        var expectedIsActive = true;
        var expectedId = expectedCategory.getId();
        var exceptedErr = "Gateway exception";

        categoryRepository.saveAndFlush(CategoryJpaEntity.from(expectedCategory));

        Mockito.doThrow(new RuntimeException(exceptedErr))
                        .when(categoryGateway).update(Mockito.any());

        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, null, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).getLeft();
        assertEquals(exceptedErr, output.getErrors().getFirst().message());
    }
}
