package com.example.domain;

import java.util.Objects;

public abstract class Entity<ID extends Identifier> {
    protected final ID id;

    public Entity(final ID id) {
        Objects.requireNonNull(id, "id is required");
        this.id = id;
    }

    public ID getId() {
        return this.id;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Entity<?> entity = (Entity<?>) o;
        return Objects.equals(getId(), entity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
