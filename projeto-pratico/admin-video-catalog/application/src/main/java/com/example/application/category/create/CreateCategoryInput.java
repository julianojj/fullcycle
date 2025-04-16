package com.example.application.category.create;

public record CreateCategoryInput(
        String name,
        String description,
        boolean isActive
) {
}
