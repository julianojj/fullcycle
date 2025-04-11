package com.example.application.category.create;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CreateCategoryUsecaseTest {
    @Test
    public void testCreateCategory() {
        var createCategory = new CreateCategoryUsecase();
        var input = new CreateCategoryInput("any-name", "any-description");
        var output = createCategory.execute(input);
        assertNotNull(output.id());
    }
}
