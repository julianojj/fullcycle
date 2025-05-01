package com.example.application.category.retrieve;

import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class GetCategoryTest {
    @InjectMocks
    private GetCategoryUsecase getCategoryUsecase;

    @Mock
    private CategoryGateway categoryGateway;

    @BeforeEach
    public void cleanUp() {
        Mockito.reset(categoryGateway);
    }

    @Test
    public void testGetCategory() {
        var expectedCategory = Category.with("any-name", "any-description", true);
        var expectedCategoryId = expectedCategory.getId();
        var input = new GetCategoryInput(expectedCategoryId.getValue());
        Mockito.when(categoryGateway.findById(Mockito.eq(expectedCategoryId)))
                .thenReturn(Optional.of(expectedCategory));
        var output = this.getCategoryUsecase.execute(input);
        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findById(expectedCategoryId);
        assertEquals(expectedCategory.getName(), output.get().name());
        assertEquals(expectedCategory.getDescription(), output.get().description());
        assertTrue(output.get().isActive());
    }

    @Test
    public void testGetCategoryNotFound() {
        var expectedCategoryId = "1";
        var expectedErr = "category not found";
        var input = new GetCategoryInput(expectedCategoryId);
        Mockito.when(categoryGateway.findById(Mockito.eq(CategoryID.from(expectedCategoryId))))
                .thenReturn(Optional.empty());
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
