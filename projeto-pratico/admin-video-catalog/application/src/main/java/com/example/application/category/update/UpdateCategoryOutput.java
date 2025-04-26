package com.example.application.category.update;

import com.example.domain.Category;

import java.time.Instant;

public record UpdateCategoryOutput(
        String id,
        String name,
        String description,
        Boolean isActive,
        Instant updatedAt
) {
    public static UpdateCategoryOutput from(Category category) {
        return new UpdateCategoryOutput(
                category.getId().getValue(),
                category.getName(),
                category.getDescription(),
                category.getActive(),
                category.getUpdatedAt()
        );
    }
}
