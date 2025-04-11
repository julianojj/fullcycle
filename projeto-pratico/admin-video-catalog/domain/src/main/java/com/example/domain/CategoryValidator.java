package com.example.domain;

import com.example.validation.Error;
import com.example.validation.ValidationHandler;
import com.example.validation.Validator;

public class CategoryValidator extends Validator {

    private final Category category;
    private static final int MIN_NAME_LENGTH = 3;
    private static final int MAX_NAME_LENGTH = 255;

    public CategoryValidator(Category category, ValidationHandler handler) {
        super(handler);
        this.category = category;
    }

    @Override
    public void validate() {
        if(this.category.getName().isEmpty() || this.category.getName().isBlank() || this.category.getName() == null) {
            this.validationHandler().append(new Error("name is required"));
            return;
        }
        var nameLength = this.category.getName().trim().length();
        if(nameLength < MIN_NAME_LENGTH || nameLength > MAX_NAME_LENGTH) {
            this.validationHandler().append(new Error("invalid name length"));
        }
    }
}
