package com.example.application.category.create;

import com.example.application.UseCase;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.validation.handler.ThrowsValidationHandler;

import java.util.Objects;

public class CreateCategoryUsecase extends UseCase<CreateCategoryInput, CreateCategoryOutput> {

    private final CategoryGateway categoryGateway;

    public CreateCategoryUsecase(CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    @Override
    public CreateCategoryOutput execute(CreateCategoryInput createCategoryInput) {
        var category = Category.with(
                createCategoryInput.name(),
                createCategoryInput.description(),
                createCategoryInput.isActive()
        );
        category.validate(new ThrowsValidationHandler());
        this.categoryGateway.create(category);
        return new CreateCategoryOutput(category.getId());
    }
}
