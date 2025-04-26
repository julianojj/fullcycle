package com.example.application.category.update;

import com.example.application.category.create.CreateCategoryInput;
import com.example.application.category.create.CreateCategoryUsecase;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.shadow.com.univocity.parsers.common.input.ExpandingCharAppender;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;

@ExtendWith(MockitoExtension.class)
public class UpdateCategoryUsecaseTest {
    @InjectMocks
    private UpdateCategoryUsecase updateCategoryUsecase;

    @Mock
    private CategoryGateway categoryGateway;

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
}
