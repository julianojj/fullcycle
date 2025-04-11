package com.example.domain;

import com.example.validation.ValidationHandler;

public abstract class AggregateRoot<ID extends Identifier> extends Entity<ID>{
    public AggregateRoot(ID id) {
        super(id);
    }

    public abstract void validate(ValidationHandler handler);

}
