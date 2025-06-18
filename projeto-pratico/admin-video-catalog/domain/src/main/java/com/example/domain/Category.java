package com.example.domain;

import com.example.validation.ValidationHandler;
import com.example.validation.handler.ThrowsValidationHandler;

import java.security.PublicKey;
import java.time.Instant;
import java.util.Objects;

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
        this.name = Objects.requireNonNull(name);
        this.description = description;
        this.active = true;
        var now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
        this.deletedAt = null;
    }

    public Category(
            CategoryID categoryId,
            String name,
            String description,
            boolean isActive,
            Instant createdAt,
            Instant updatedAt,
            Instant deletedAt
    ) {
        super(categoryId);
        this.name = Objects.requireNonNull(name);
        this.description = description;
        this.active = isActive;
        this.createdAt = Objects.requireNonNull(createdAt);
        this.updatedAt = Objects.requireNonNull(updatedAt);
        this.deletedAt = deletedAt;
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

    public static Category with(
            CategoryID categoryId,
            String name,
            String description,
            boolean isActive,
            Instant createdAt,
            Instant updatedAt,
            Instant deletedAt
    ) {
        return new Category(
                categoryId,
                name,
                description,
                isActive,
                createdAt,
                updatedAt,
                deletedAt
        );
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
