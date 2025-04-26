package com.example.application.category.create;

import com.example.application.UseCase;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.validation.handler.Notification;
import io.vavr.control.Either;

import java.util.Objects;

import static io.vavr.API.*;

public class CreateCategoryUsecase extends UseCase<CreateCategoryInput, CreateCategoryOutput> {

    private final CategoryGateway categoryGateway;

    public CreateCategoryUsecase(CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    @Override
    public Either<Notification, CreateCategoryOutput> execute(CreateCategoryInput createCategoryInput) {
        var category = Category.with(
                createCategoryInput.name(),
                createCategoryInput.description(),
                createCategoryInput.isActive()
        );
        var notification = Notification.create();
        category.validate(notification);
        return notification.hasErrors() ? Left(notification) : create(category);
    }


    private Either<Notification, CreateCategoryOutput> create(Category category) {
        return Try(() -> this.categoryGateway.create(category))
                .toEither()
                .bimap(Notification::create, CreateCategoryOutput::from);
    }
}
