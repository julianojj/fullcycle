package com.example.application.category.retrieve;

import com.example.domain.Category;

import java.time.Instant;

public record GetCategoriesOutput(
        String id,
        String name,
        String description,
        Boolean isActive,
        Instant createdAt,
        Instant updatedAt,
        Instant deletedAt
) {
    public static GetCategoriesOutput from(Category category) {
        return new GetCategoriesOutput(
                category.getId().getValue(),
                category.getName(),
                category.getDescription(),
                category.getActive(),
                category.getCreatedAt(),
                category.getUpdatedAt(),
                category.getDeletedAt()
        );
    }
}
