package com.example.application.category.delete;

import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class DeleteCategoryUsecaseTest {
    @InjectMocks
    private DeleteCategoryUsecase deleteCategoryUsecase;

    @Mock
    private CategoryGateway categoryGateway;

    @BeforeEach
    public void cleanUp() {
        Mockito.reset(categoryGateway);
    }

    @Test
    public void testDeleteCategory() {
        var expectedCategoryId = "1";
        var input = new DeleteCategoryUsecaseInput(expectedCategoryId);
        var output = this.deleteCategoryUsecase.execute(input);
        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).deleteById(Mockito.eq(CategoryID.from(expectedCategoryId)));
    }

    @Test
    public void testDeleteCategoryExceptionGateway() {
        var expectedCategoryId = "1";
        var expectedErr = "Gateway exception";
        var input = new DeleteCategoryUsecaseInput(expectedCategoryId);
        Mockito.doThrow(new IllegalStateException(expectedErr))
                .when(categoryGateway)
                .deleteById(Mockito.eq(CategoryID.from(expectedCategoryId)));
        var output = this.deleteCategoryUsecase.execute(input);
        Mockito.verify(categoryGateway, Mockito.times(1)).deleteById(Mockito.eq(CategoryID.from(expectedCategoryId)));
        assertEquals(expectedErr, output.getLeft().getErrors().getFirst().message());
    }
}
