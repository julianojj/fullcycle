package com.example.application.category.retrieve;

import com.example.IntegrationTest;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import com.example.infrastructure.category.persistence.CategoryJpaEntity;
import com.example.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import static org.junit.jupiter.api.Assertions.*;

@IntegrationTest
public class GetCategoryIntegrationTest {
    @Autowired
    private GetCategoryUsecase getCategoryUsecase;

    @Autowired
    private CategoryRepository categoryRepository;

    @SpyBean
    private CategoryGateway categoryGateway;

    @BeforeEach
    public void cleanUp() {
        Mockito.reset(categoryGateway);
    }

    @Test
    public void testGetCategory() {
        var expectedCategory = Category.with("any-name", "any-description", true);

        categoryRepository.saveAndFlush(CategoryJpaEntity.from(expectedCategory));

        var expectedCategoryId = expectedCategory.getId();
        var input = new GetCategoryInput(expectedCategoryId.getValue());
        var output = this.getCategoryUsecase.execute(input);

        assertNotNull(output);
        assertEquals(expectedCategory.getName(), output.get().name());
        assertEquals(expectedCategory.getDescription(), output.get().description());
        Mockito.verify(categoryGateway, Mockito.times(1)).findById(expectedCategoryId);
        assertTrue(output.get().isActive());
    }

    @Test
    public void testGetCategoryNotFound() {
        var expectedCategoryId = "1";
        var expectedErr = "category not found";
        var input = new GetCategoryInput(expectedCategoryId);
        var output = this.getCategoryUsecase.execute(input);

        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findById(CategoryID.from(expectedCategoryId));
        assertEquals(expectedErr, output.getLeft().getErrors().getFirst().message());
    }

    @Test
    public void testGetCategoryGatewayException() {
        var expectedCategoryId = "1";
        var expectedErr = "Gateway exception";
        var input = new GetCategoryInput(expectedCategoryId);
        Mockito.doThrow(new IllegalStateException(expectedErr))
                .when(categoryGateway)
                .findById(Mockito.eq(CategoryID.from(expectedCategoryId)));
        var output = this.getCategoryUsecase.execute(input).getLeft();
        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findById(CategoryID.from(expectedCategoryId));
        assertEquals(expectedErr, output.getErrors().getFirst().message());
    }
}
