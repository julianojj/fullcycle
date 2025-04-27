package com.example.application.category.update;

import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.exceptions.DomainException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;

@ExtendWith(MockitoExtension.class)
public class UpdateCategoryUsecaseTest {
    @InjectMocks
    private UpdateCategoryUsecase updateCategoryUsecase;

    @Mock
    private CategoryGateway categoryGateway;

    @BeforeEach
    public void cleanUp() {
        Mockito.reset(categoryGateway);
    }

    @Test
    public void testUpdateCategory() {
        var expectedCategory = Category.with("any-name", null, true);
        var expectedName = "any-name-2";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var expectedId = expectedCategory.getId();
        var expectedUpdatedAt = expectedCategory.getUpdatedAt();
        Mockito.when(categoryGateway.findById(Mockito.eq(expectedId)))
                .thenReturn(Optional.of(expectedCategory));
        Mockito.when(categoryGateway.update(Mockito.any()))
                .thenAnswer(returnsFirstArg());
        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, expectedDescription, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).get();
        assertNotNull(output);
        assertNotNull(output.id());
        Mockito.verify(categoryGateway, Mockito.times(1)).findById(expectedCategory.getId());
        Mockito.verify(categoryGateway, Mockito.times(1)).update(Mockito.argThat(
                category ->
                        category.getName().equals(expectedName)
                        && category.getDescription().equals(expectedDescription)
                        && category.getActive().equals(expectedIsActive)
                        && category.getId().equals(expectedId)
                        && category.getUpdatedAt().isAfter(expectedUpdatedAt)
        ));
    }

    @Test
    public void testUpdateCategoryToInactive() {
        var expectedCategory = Category.with("any-name", null, true);
        var expectedName = "any-name-2";
        var expectedDescription = "any-description";
        var expectedIsActive = false;
        var expectedId = expectedCategory.getId();
        var expectedUpdatedAt = expectedCategory.getUpdatedAt();
        Mockito.when(categoryGateway.findById(Mockito.eq(expectedId)))
                .thenReturn(Optional.of(expectedCategory));
        Mockito.when(categoryGateway.update(Mockito.any()))
                .thenAnswer(returnsFirstArg());
        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, expectedDescription, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).get();
        assertNotNull(output);
        assertNotNull(output.id());
        Mockito.verify(categoryGateway, Mockito.times(1)).findById(expectedCategory.getId());
        Mockito.verify(categoryGateway, Mockito.times(1)).update(Mockito.argThat(
                category ->
                        category.getName().equals(expectedName)
                                && category.getDescription().equals(expectedDescription)
                                && category.getActive().equals(expectedIsActive)
                                && category.getId().equals(expectedId)
                                && category.getUpdatedAt().isAfter(expectedUpdatedAt)
                                && Objects.nonNull(category.getDeletedAt())
        ));
    }

    @Test
    public void testUpdateCategoryNotFound() {
        var expectedCategory = Category.with("any-name", "any-description", true);
        var expectedName = "any-name-2";
        var expectedIsActive = true;
        var expectedId = expectedCategory.getId();
        var expectedErr = "category not found";
        Mockito.when(categoryGateway.findById(Mockito.eq(expectedId)))
                .thenReturn(Optional.empty());
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
        Mockito.when(categoryGateway.findById(Mockito.eq(expectedId)))
                .thenReturn(Optional.of(expectedCategory));
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
        Mockito.when(categoryGateway.findById(Mockito.eq(expectedId)))
                .thenReturn(Optional.of(expectedCategory));
        Mockito.when(categoryGateway.update(Mockito.any()))
                .thenThrow(new RuntimeException(exceptedErr));
        var input = new UpdateCategoryInput(expectedId.getValue(), expectedName, null, expectedIsActive);
        var output = updateCategoryUsecase.execute(input).getLeft();
        assertEquals(exceptedErr, output.getErrors().getFirst().message());
    }
}
