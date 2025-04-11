package com.example.exceptions;

import com.example.validation.Error;

import java.util.List;

public class DomainException extends NoStacktraceException {
    private final List<Error> errors;

    private DomainException(String message, List<Error> errors) {
        super(message);
        this.errors = errors;
    }

    public static DomainException with(Error err) {
        return new DomainException(err.message(), List.of(err));
    }

    public static DomainException with(List<Error> errors) {
        return new DomainException("", errors);
    }

    public List<Error> getErrors() {
        return this.errors;
    }
}
