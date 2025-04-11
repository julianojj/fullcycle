package com.example.validation.handler;

import com.example.exceptions.DomainException;
import com.example.validation.Error;
import com.example.validation.ValidationHandler;

import java.util.List;

public class ThrowsValidationHandler implements ValidationHandler {

    @Override
    public ValidationHandler append(com.example.validation.Error err) {
        throw DomainException.with(err);
    }

    @Override
    public ValidationHandler append(ValidationHandler handler) {
        throw DomainException.with(handler.getErrors());
    }

    @Override
    public ValidationHandler validate(Validation validation) {
        try {
            validation.validate();
        } catch (Exception err) {
            throw DomainException.with(new Error(err.getMessage()));
        }
        return this;
    }

    @Override
    public List<Error> getErrors() {
        return List.of();
    }
}
