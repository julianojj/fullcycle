package com.example.application.category.retrieve;

public record GetCategoriesInput(
        int page,
        int perPage,
        String terms,
        String sort,
        String direction
) {
}
