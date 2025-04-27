package com.example.application.category.delete;

public record DeleteCategoryUsecaseOutput(
        String id
) {
    public static DeleteCategoryUsecaseOutput from(String id) {
        return new DeleteCategoryUsecaseOutput(id);
    }
}
