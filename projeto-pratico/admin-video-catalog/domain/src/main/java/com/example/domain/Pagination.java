package com.example.domain;

import java.util.List;

public record Pagination<T>(
    int currentPage,
    int perPage,
    long total,
    List<T> items
) {
    public List<T> items() {
        return items;
    }
}
