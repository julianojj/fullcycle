package com.example.application.category.create;

import com.example.domain.CategoryGateway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;

@ExtendWith(MockitoExtension.class)
class CreateCategoryUsecaseTest {

    @InjectMocks
    private CreateCategoryUsecase createCategoryUsecase;

    @Mock
    private CategoryGateway categoryGateway;

    @BeforeEach
    public void cleanUp() {
        Mockito.reset(categoryGateway);
    }

    @Test
    public void testCreateCategory() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        Mockito.when(categoryGateway.create(Mockito.any()))
                .thenAnswer(returnsFirstArg());
        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsActive);
        var output = createCategoryUsecase.execute(input).get();
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
        Mockito.when(categoryGateway.create(Mockito.any()))
                .thenAnswer(returnsFirstArg());
        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsDeactivated);
        var output = createCategoryUsecase.execute(input).get();
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

    @Test
    public void testCreateCategoryWithDomainException() {
        var expectedName = "";
        var expectedDescription = "any-description";
        var expectedException = "name is required";
        var expectedIsActive = true;
        var expectedErrorCount = 1;
        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsActive);
        var notification = createCategoryUsecase.execute(input).getLeft();
        assertEquals(expectedErrorCount, notification.getErrors().size());
        assertEquals(expectedException, notification.getErrors().getFirst().message());
        Mockito.verify(categoryGateway, Mockito.times(0)).create(Mockito.any());
    }

    @Test
    public void testCreateCategoryWithGatewayException() {
        var expectedName = "any-name";
        var expectedDescription = "any-description";
        var expectedIsActive = true;
        var expectedGatewayError = "gateway error";
        var expectedErrorCount = 1;
        Mockito.when(categoryGateway.create(Mockito.any()))
                .thenThrow(new IllegalStateException(expectedGatewayError));
        var input = new CreateCategoryInput(expectedName, expectedDescription, expectedIsActive);
        var notification = createCategoryUsecase.execute(input).getLeft();
        assertEquals(expectedErrorCount, notification.getErrors().size());
        assertEquals(expectedGatewayError, notification.getErrors().getFirst().message());
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
}
