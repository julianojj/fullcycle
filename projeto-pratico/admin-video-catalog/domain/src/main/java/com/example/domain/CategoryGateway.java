package com.example.domain;

import java.util.Optional;

public interface CategoryGateway {
    Category create(Category category);
    Optional<Category> findById(CategoryID id);
    void update(Category category);
    void deleteById(CategoryID id);
    Pagination<Category> findAll(CategorySearchQuery query);
}
