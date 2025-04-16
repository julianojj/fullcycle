package com.example.domain;

import com.example.validation.ValidationHandler;
import com.example.validation.handler.ThrowsValidationHandler;

import java.time.Instant;

public class Category extends AggregateRoot<CategoryID> {
    private String name;
    private String description;
    private boolean active;
    private final Instant createdAt;
    private Instant updatedAt;
    private Instant deletedAt;
    

    public Category(
            String name,
            String description
    ) {
        super(CategoryID.unique());
        this.name = name;
        this.description = description;
        this.active = true;
        var now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
        this.deletedAt = null;
    }


    public static Category with(
            String name,
            String description,
            boolean isActive
    ) {
        var category = new Category(name, description);
        if (!isActive) {
            category.Deactivate();
        }
        return category;
    }

    @Override
    public void validate(ValidationHandler handler) {
        new CategoryValidator(this, handler).validate();
    }

    public void Activate() {
        this.deletedAt = null;
        this.updatedAt = Instant.now();
        this.active = true;
    }

    public void Deactivate() {
        if (this.getDeletedAt() == null) {
            this.deletedAt = Instant.now();
        }
        this.updatedAt = Instant.now();
        this.active = false;
    }

    public void update(String name, String description, boolean isActive) {
        if (isActive) {
            this.Activate();
        } else {
            this.Deactivate();
        }
        this.name = name;
        this.description = description;
        this.updatedAt = Instant.now();
        this.validate(new ThrowsValidationHandler());
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Boolean getActive() {
        return this.active;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public Instant getUpdatedAt() {
        return  this.updatedAt;
    }

    public Instant getDeletedAt() {
        return this.deletedAt;
    }
}
