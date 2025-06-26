package com.example.infrastructure.configuration.usecases;

import com.example.application.category.create.CreateCategoryUsecase;
import com.example.application.category.delete.DeleteCategoryUsecase;
import com.example.application.category.retrieve.GetCategories;
import com.example.application.category.retrieve.GetCategoryUsecase;
import com.example.application.category.update.UpdateCategoryUsecase;
import com.example.domain.CategoryGateway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoryUsecaseConfig {

    private final CategoryGateway categoryGateway;

    public CategoryUsecaseConfig(CategoryGateway categoryGateway) {
        this.categoryGateway = categoryGateway;
    }

    @Bean
    public CreateCategoryUsecase createCategoryUsecase() {
        return new CreateCategoryUsecase(this.categoryGateway);
    }

    @Bean
    public UpdateCategoryUsecase updateCategoryUsecase() {
        return new UpdateCategoryUsecase(this.categoryGateway);
    }

    @Bean
    public GetCategoryUsecase getCategoryUsecase() {
        return new GetCategoryUsecase(this.categoryGateway);
    }

    @Bean
    public GetCategories getCategoriesUsecase() {
        return new GetCategories(this.categoryGateway);
    }

    @Bean
    public DeleteCategoryUsecase deleteCategoryUsecase() {
        return new DeleteCategoryUsecase(this.categoryGateway);
    }
}
