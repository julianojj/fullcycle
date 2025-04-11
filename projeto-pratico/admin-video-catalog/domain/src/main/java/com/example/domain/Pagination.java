package com.example.domain;

public record Pagination<T>(
    int currentPage,
    int perPage,
    long total
) {

};
