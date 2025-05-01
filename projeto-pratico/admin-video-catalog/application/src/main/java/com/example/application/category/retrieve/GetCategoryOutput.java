package com.example.application.category.retrieve;

import com.example.domain.Category;

import java.time.Instant;

public record GetCategoryOutput(
        String id,
        String name,
        String description,
        Boolean isActive,
        Instant createdAt,
        Instant updatedAt,
        Instant deletedAt
) {
    public static GetCategoryOutput from(Category category) {
        return new GetCategoryOutput(
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
