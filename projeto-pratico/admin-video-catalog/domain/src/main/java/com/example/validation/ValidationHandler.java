package com.example.validation;

import java.util.List;

public interface ValidationHandler {
    ValidationHandler append(Error err);
    ValidationHandler append(ValidationHandler handler);
    ValidationHandler validate(Validation validation);
    List<Error> getErrors();
    default boolean hasErrors() {
        return getErrors() != null && !getErrors().isEmpty();
    }
    public interface Validation {
        void validate();
    }
}
