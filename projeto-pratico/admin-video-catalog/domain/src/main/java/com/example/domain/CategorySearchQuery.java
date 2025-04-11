package com.example.domain;

public record CategorySearchQuery(
    int page,
    int perPage,
    String terms,
    String sort,
    String direction
)  {

}
