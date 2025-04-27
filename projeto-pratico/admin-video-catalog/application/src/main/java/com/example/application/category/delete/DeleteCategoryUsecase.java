package com.example.application.category.delete;

import com.example.application.UseCase;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import com.example.validation.handler.Notification;
import io.vavr.control.Either;

public class DeleteCategoryUsecase extends UseCase<DeleteCategoryUsecaseInput, DeleteCategoryUsecaseOutput> {
    private final CategoryGateway categoryGateway;

    public DeleteCategoryUsecase(CategoryGateway categoryGateway) {
        this.categoryGateway = categoryGateway;
    }

    public Either<Notification, DeleteCategoryUsecaseOutput> execute(DeleteCategoryUsecaseInput input) {
        try {
            this.categoryGateway.deleteById(CategoryID.from(input.id()));
            return Either.right(DeleteCategoryUsecaseOutput.from(input.id()));
        } catch (Throwable err) {
            return Either.left(Notification.create(err));
        }
    }
}
