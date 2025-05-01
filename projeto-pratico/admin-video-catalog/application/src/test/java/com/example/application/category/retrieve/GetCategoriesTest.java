package com.example.application.category.retrieve;

import com.example.domain.Category;
import com.example.domain.CategoryGateway;
import com.example.domain.CategorySearchQuery;
import com.example.domain.Pagination;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class GetCategoriesTest {
    @InjectMocks
    private GetCategories usecase;

    @Mock
    private CategoryGateway categoryGateway;

    @BeforeEach
    public void cleanUp() {
        Mockito.reset(categoryGateway);
    }

    @Test
    public void testGetCategories() {
        var expectedPage = 0;
        var expectedPerPage = 10;
        var expectedTerms = "";
        var expectedSort = "createdAt";
        var expectedDirection = "asc";
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, expectedTerms, expectedSort, expectedDirection);
        var expectedCategories = List.of(
                Category.with("any-name", "any-description", true),
                Category.with("any-name-2", null, false)
        );
        var expectedPagination = new Pagination<>(expectedPage, expectedPerPage, expectedCategories.size(), expectedCategories);
        Mockito.when(categoryGateway.findAll(Mockito.eq(query)))
                .thenReturn(expectedPagination);
        var input = new GetCategoriesInput(
                expectedPage,
                expectedPerPage,
                expectedTerms,
                expectedSort,
                expectedDirection
        );
        var output = this.usecase.execute(input);
        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findAll(query);
        assertEquals(expectedCategories.size(), output.get().size());
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
        var expectedCategories = new ArrayList<Category>();
        var expectedPagination = new Pagination<>(expectedPage, expectedPerPage, expectedSize, expectedCategories);
        Mockito.when(categoryGateway.findAll(Mockito.eq(query)))
                .thenReturn(expectedPagination);
        var input = new GetCategoriesInput(
                expectedPage,
                expectedPerPage,
                expectedTerms,
                expectedSort,
                expectedDirection
        );
        var output = this.usecase.execute(input);
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
        Mockito.when(categoryGateway.findAll(Mockito.eq(query)))
                .thenThrow(new IllegalStateException(expectedErr));
        var input = new GetCategoriesInput(
                expectedPage,
                expectedPerPage,
                expectedTerms,
                expectedSort,
                expectedDirection
        );
        var output = this.usecase.execute(input);
        assertNotNull(output);
        Mockito.verify(categoryGateway, Mockito.times(1)).findAll(query);
        assertEquals(expectedErr, output.getLeft().getErrors().getFirst().message());
    }
}
