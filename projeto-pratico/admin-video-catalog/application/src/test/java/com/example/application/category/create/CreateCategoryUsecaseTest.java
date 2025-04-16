package com.example.application.category.create;

import com.example.domain.CategoryGateway;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;

class CreateCategoryUsecaseTest {
    @Test
    public void testCreateCategory() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var categoryGateway = Mockito.mock(CategoryGateway.class);
        Mockito.when(categoryGateway.create(Mockito.any()))
                .thenAnswer(returnsFirstArg());
        var createCategory = new CreateCategoryUsecase(categoryGateway);
        var input = new CreateCategoryInput(expectedName, expectedDescription, true);
        var output = createCategory.execute(input);
        assertNotNull(output.id());
        Mockito.verify(categoryGateway, Mockito.times(1)).create(Mockito.argThat(category -> {
            return Objects.equals(expectedName, category.getName())
                    && Objects.equals(expectedDescription, category.getDescription())
                    && Objects.equals(expectedIsActive, category.getActive())
                    && Objects.nonNull(category.getId())
                    && Objects.nonNull(category.getCreatedAt())
                    && Objects.nonNull(category.getUpdatedAt())
                    && Objects.isNull(category.getDeletedAt());
        }));
    }

    @Test
    public void testCreateInactivatedCategory() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsDeactivated = false;
        var categoryGateway = Mockito.mock(CategoryGateway.class);
        Mockito.when(categoryGateway.create(Mockito.any()))
                .thenAnswer(returnsFirstArg());
        var createCategory = new CreateCategoryUsecase(categoryGateway);
        var input = new CreateCategoryInput(expectedName, expectedDescription, false);
        var output = createCategory.execute(input);
        assertNotNull(output.id());
        Mockito.verify(categoryGateway, Mockito.times(1)).create(Mockito.argThat(category -> {
            return Objects.equals(expectedName, category.getName())
                    && Objects.equals(expectedDescription, category.getDescription())
                    && Objects.equals(expectedIsDeactivated, category.getActive())
                    && Objects.nonNull(category.getId())
                    && Objects.nonNull(category.getCreatedAt())
                    && Objects.nonNull(category.getUpdatedAt())
                    && Objects.nonNull(category.getDeletedAt());
        }));
    }
}
