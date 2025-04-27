package com.example.application.category.delete;

public record DeleteCategoryUsecaseInput(
        String id
) {
    public static DeleteCategoryUsecaseInput from(String id) {
        return new DeleteCategoryUsecaseInput(id);
    }
}
