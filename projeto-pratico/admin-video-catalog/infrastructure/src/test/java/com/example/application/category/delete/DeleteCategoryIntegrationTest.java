package com.example.application.category.delete;

import com.example.IntegrationTest;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategoryID;
import com.example.infrastructure.category.persistence.CategoryJpaEntity;
import com.example.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@IntegrationTest
public class DeleteCategoryIntegrationTest {
        @Autowired
        private DeleteCategoryUsecase deleteCategoryUsecase;

        @Autowired
        private CategoryRepository categoryRepository;

        @SpyBean
        private CategoryGateway categoryGateway;

        @Test
        public void testDeleteCategory() {
            var expectedCategory = Category.with("any-name", "any-description", true);
            var expectedCategoryId = expectedCategory.getId().getValue();
            var input = new DeleteCategoryUsecaseInput(expectedCategoryId);

            categoryRepository.saveAndFlush(CategoryJpaEntity.from(expectedCategory));

            assertEquals(1, categoryRepository.count());

            var output = this.deleteCategoryUsecase.execute(input);

            assertNotNull(output);
            Mockito.verify(categoryGateway, Mockito.times(1)).deleteById(Mockito.eq(CategoryID.from(expectedCategoryId)));
            assertEquals(0, categoryRepository.count());
        }

        @Test
        public void testDeleteCategoryExceptionGateway() {
            var expectedCategoryId = "1";
            var expectedErr = "Gateway exception";
            var input = new DeleteCategoryUsecaseInput(expectedCategoryId);
            Mockito.doThrow(new IllegalStateException(expectedErr))
                    .when(categoryGateway)
                    .deleteById(Mockito.eq(CategoryID.from(expectedCategoryId)));
            var output = this.deleteCategoryUsecase.execute(input);
            Mockito.verify(categoryGateway, Mockito.times(1)).deleteById(Mockito.eq(CategoryID.from(expectedCategoryId)));
            assertEquals(expectedErr, output.getLeft().getErrors().getFirst().message());
        }
}
