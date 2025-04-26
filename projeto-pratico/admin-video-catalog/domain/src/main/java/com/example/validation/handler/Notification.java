package com.example.validation.handler;

import com.example.exceptions.DomainException;
import com.example.validation.Error;
import com.example.validation.ValidationHandler;

import java.util.ArrayList;
import java.util.List;

public class Notification implements ValidationHandler {

    private final List<Error> errors;

    private Notification(List<Error>errors) {
        this.errors = errors;
    }

    public static Notification create() {
        return new Notification(new ArrayList<>());
    }

    public static Notification create(Error err) {
        return new Notification(new ArrayList<>()).append(err);
    }

    public static Notification create(Throwable err) {
        return create(new Error(err.getMessage()));
    }

    @Override
    public Notification append(Error err) {
        this.errors.add(err);
        return this;
    }

    @Override
    public Notification append(ValidationHandler handler) {
        this.errors.addAll(handler.getErrors());
        return this;
    }

    @Override
    public Notification validate(Validation validation) {
        try {
            validation.validate();
        } catch (DomainException err) {
            this.errors.addAll(err.getErrors());
        } catch (Throwable err) {
            this.errors.add(new Error(err.getMessage()));
        }
        return this;
    }

    @Override
    public List<Error> getErrors() {
        return this.errors;
    }
}
