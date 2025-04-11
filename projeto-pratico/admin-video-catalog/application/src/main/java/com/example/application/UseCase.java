package com.example.application;

import com.example.domain.Category;

public class UseCase {
    public Category Execute() throws Exception {
        return new Category("Terror", null);
    };
}
