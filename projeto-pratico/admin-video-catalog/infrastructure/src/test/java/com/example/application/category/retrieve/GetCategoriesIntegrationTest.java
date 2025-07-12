package com.example.application.category.retrieve;

import com.example.IntegrationTest;
import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategorySearchQuery;
import com.example.infrastructure.category.persistence.CategoryJpaEntity;
import com.example.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.rmi.server.ExportException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@IntegrationTest
public class GetCategoriesIntegrationTest {
    @Autowired
    private GetCategories getCategories;

    @Autowired
    private CategoryRepository categoryRepository;

    @SpyBean
    private CategoryGateway categoryGateway;


    @Test
    public void testGetCategories() {
        var expectedPage = 0;
        var expectedPerPage = 10;
        var expectedTerms = "";
        var expectedSort = "createdAt";
        var expectedDirection = "asc";
        var expectedCategoriesSize = 2;
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, expectedTerms, expectedSort, expectedDirection);

        assertEquals(0, categoryRepository.count());

        categoryRepository.saveAll(List.of(
                CategoryJpaEntity.from(Category.with("any-name", "any-description", true)),
                CategoryJpaEntity.from(Category.with("any-name-2", null, false))
        ));

        var input = new GetCategoriesInput(
                expectedPage,
                expectedPerPage,
                expectedTerms,
                expectedSort,
                expectedDirection
        );
        var output = this.getCategories.execute(input);

        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findAll(query);
        assertEquals(expectedCategoriesSize, categoryRepository.count());
        assertEquals(expectedCategoriesSize, output.get().size());
    }

    @Test
    public void testGetCategoriesNoResult() {
        var expectedPage = 0;
        var expectedPerPage = 10;
        var expectedTerms = "";
        var expectedSort = "createdAt";
        var expectedDirection = "asc";
        var expectedSize = 0;
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, expectedTerms, expectedSort, expectedDirection);
        var input = new GetCategoriesInput(
                expectedPage,
                expectedPerPage,
                expectedTerms,
                expectedSort,
                expectedDirection
        );
        var output = this.getCategories.execute(input);

        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findAll(query);
        assertEquals(expectedSize, output.get().size());
    }

    @Test
    public void testGetCategoriesExceptionGateway() {
        var expectedPage = 0;
        var expectedPerPage = 10;
        var expectedTerms = "";
        var expectedSort = "createdAt";
        var expectedDirection = "asc";
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, expectedTerms, expectedSort, expectedDirection);
        var expectedErr = "Gateway exception";

        Mockito.doThrow(new IllegalStateException(expectedErr)).when(categoryGateway).findAll(Mockito.eq(query));

        var input = new GetCategoriesInput(
                expectedPage,
                expectedPerPage,
                expectedTerms,
                expectedSort,
                expectedDirection
        );
        var output = this.getCategories.execute(input);

        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findAll(query);
        assertEquals(expectedErr, output.getLeft().getErrors().getFirst().message());
    }
}
