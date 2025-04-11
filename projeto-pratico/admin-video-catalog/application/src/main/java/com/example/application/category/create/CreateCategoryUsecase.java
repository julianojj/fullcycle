package com.example.application.category.create;

import com.example.application.UseCase;
import com.example.domain.Category;
import com.example.validation.handler.ThrowsValidationHandler;

public class CreateCategoryUsecase extends UseCase<CreateCategoryInput, CreateCategoryOutput> {
    @Override
    public CreateCategoryOutput execute(CreateCategoryInput createCategoryInput) {
        var category = new Category(createCategoryInput.name(), createCategoryInput.description());
        category.validate(new ThrowsValidationHandler());
        return new CreateCategoryOutput(category.getId().getValue());
    }
}
