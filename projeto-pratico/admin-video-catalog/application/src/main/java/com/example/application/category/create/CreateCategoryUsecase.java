package com.example.application.category.create;

import com.example.application.UseCase;

public class CreateCategoryUsecase extends UseCase<CreateCategoryInput, CreateCategoryOutput> {
    @Override
    public CreateCategoryOutput execute(CreateCategoryInput createCategoryInput) {
        return new CreateCategoryOutput();
    }
}
