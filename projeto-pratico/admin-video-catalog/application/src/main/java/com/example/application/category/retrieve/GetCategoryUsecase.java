package com.example.application.category.retrieve;

import com.example.application.UseCase;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import com.example.validation.Error;
import com.example.validation.handler.Notification;
import io.vavr.control.Either;

import java.util.Objects;
import java.util.Optional;

import static io.vavr.API.Left;
import static io.vavr.API.Right;

public class GetCategoryUsecase extends UseCase<GetCategoryInput, GetCategoryOutput> {
    private final CategoryGateway categoryGateway;

    public GetCategoryUsecase(CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    public Either<Notification, GetCategoryOutput> execute(GetCategoryInput input) {
        var notification = Notification.create();
        Optional<Category> categoryOpt;
        try {
            categoryOpt = this.categoryGateway.findById(CategoryID.from(input.id()));
        } catch (Throwable err) {
            notification.append(new Error(err.getMessage()));
            return Left(notification);
        }
        if (categoryOpt.isEmpty()) {
            notification.append(new Error("category not found"));
            return Left(notification);
        }
        var existingCategory = categoryOpt.get();
        return Right(GetCategoryOutput.from(existingCategory));
    }
}
