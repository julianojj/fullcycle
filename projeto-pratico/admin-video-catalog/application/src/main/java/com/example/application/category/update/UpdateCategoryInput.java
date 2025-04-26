package com.example.application.category.update;

public record UpdateCategoryInput(
        String id,
        String name,
        String description,
        Boolean isActive
) {
}
