package com.example.application.category.create;

import com.example.IntegrationTest;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import com.example.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import static org.junit.jupiter.api.Assertions.*;

@IntegrationTest
public class CreateCategoryUsecaseIntegrationTest {

    @Autowired
    private CreateCategoryUsecase createCategoryUsecase;

    @Autowired
    private CategoryRepository categoryRepository;

    @SpyBean
    private CategoryGateway categoryGateway;

    @Test
    public void testCreateCategory() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;

        assertEquals(0, categoryRepository.count());

        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsActive);
        var output = createCategoryUsecase.execute(input).get();
        var categoryId = CategoryID.from(output.id().getValue());
        var category = categoryRepository.findById(categoryId.getValue()).get();

        assertEquals(1, categoryRepository.count());
        assertNotNull(expectedName, category.getName());
        assertNotNull(expectedDescription, category.getDescription());
        assertTrue(category.isActive());
        assertNotNull(category.getCreatedAt());
        assertNotNull(category.getUpdatedAt());
        assertNull(category.getDeletedAt());
    }

    @Test
    public void testCreateInactivatedCategory() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsDeactivated = false;

        assertEquals(0, categoryRepository.count());

        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsDeactivated);
        var output = createCategoryUsecase.execute(input).get();
        var categoryId = CategoryID.from(output.id().getValue());
        var category = categoryRepository.findById(categoryId.getValue()).get();

        assertEquals(1, categoryRepository.count());
        assertNotNull(expectedName, category.getName());
        assertNotNull(expectedDescription, category.getDescription());
        assertFalse(category.isActive());
        assertNotNull(category.getCreatedAt());
        assertNotNull(category.getUpdatedAt());
        assertNotNull(category.getDeletedAt());
    }

    @Test
    public void testCreateCategoryWithDomainException() {
        var expectedName = "";
        var expectedDescription = "any-description";
        var expectedException = "name is required";
        var expectedIsActive = true;
        var expectedErrorCount = 1;

        assertEquals(0, categoryRepository.count());

        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsActive);
        var notification = createCategoryUsecase.execute(input).getLeft();

        assertEquals(expectedErrorCount, notification.getErrors().size());
        assertEquals(expectedException, notification.getErrors().getFirst().message());
        assertEquals(0, categoryRepository.count());
    }

    @Test
    public void testCreateCategoryWithGatewayException() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var expectedGatewayError = "gateway error";
        var expectedErrorCount = 1;

        Mockito.doThrow((new IllegalStateException(expectedGatewayError)))
                .when(categoryGateway).create(Mockito.any());

        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsActive);
        var notification = createCategoryUsecase.execute(input).getLeft();

        assertEquals(expectedErrorCount, notification.getErrors().size());
        assertEquals(expectedGatewayError, notification.getErrors().getFirst().message());
        assertEquals(0, categoryRepository.count());
    }
}
