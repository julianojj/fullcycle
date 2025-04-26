package com.example.application.category.update;

import com.example.application.UseCase;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import com.example.validation.Error;
import com.example.validation.handler.Notification;
import io.vavr.control.Either;
import static io.vavr.API.*;

import java.util.Objects;

public class UpdateCategoryUsecase extends UseCase<UpdateCategoryInput, UpdateCategoryOutput> {
    private final CategoryGateway categoryGateway;

    public UpdateCategoryUsecase(CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    public Either<Notification, UpdateCategoryOutput> execute(UpdateCategoryInput input) {
        var notification = Notification.create();
        var categoryOpt = this.categoryGateway.findById(CategoryID.from(input.id()));
        if (categoryOpt.isEmpty()) {
            notification.append(new Error("category not found"));
            return Left(notification);
        }
        var existingCategory = categoryOpt.get();
        existingCategory.update(input.name(), input.description(), input.isActive());
        return notification.hasErrors() ? Left(notification) : create(existingCategory);
    }

    private Either<Notification, UpdateCategoryOutput> create(Category category) {
        return Try(() -> this.categoryGateway.update(category))
                .toEither()
                .bimap(Notification::create, UpdateCategoryOutput::from);
    }
}
