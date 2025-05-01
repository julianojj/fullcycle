package com.example.application.category.retrieve;

import com.example.application.UseCase;
import com.example.domain.CategoryGateway;
import com.example.domain.CategorySearchQuery;
import com.example.validation.Error;
import com.example.validation.handler.Notification;
import io.vavr.control.Either;

import java.util.ArrayList;
import java.util.Objects;

import static io.vavr.API.Left;
import static io.vavr.API.Right;

public class GetCategories extends UseCase<GetCategoriesInput, ArrayList<GetCategoriesOutput>> {
    private final CategoryGateway categoryGateway;

    public GetCategories(CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    public Either<Notification, ArrayList<GetCategoriesOutput>> execute(GetCategoriesInput getCategoriesInput) {
        var notification = Notification.create();
        var output = new ArrayList<GetCategoriesOutput>();
        try {
            var query = new CategorySearchQuery(
                    getCategoriesInput.page(),
                    getCategoriesInput.perPage(),
                    getCategoriesInput.terms(),
                    getCategoriesInput.sort(),
                    getCategoriesInput.direction()
            );
            var categories = this.categoryGateway.findAll(query);
            for (var category : categories.items()) {
                output.add(GetCategoriesOutput.from(category));
            }
        } catch (Throwable err) {
            notification.append(new Error(err.getMessage()));
            return Left(notification);
        }
        return Right(output);
    }
}
