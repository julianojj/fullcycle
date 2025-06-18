package com.example.infrastructure.category;

import com.example.domain.Category;
import com.example.domain.CategorySearchQuery;
import com.example.infrastructure.MySQLGatewayTest;
import com.example.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;


@MySQLGatewayTest
class CategoryMySQLGatewayTest {

    @Autowired
    private CategoryMySQLGateway categoryGateway;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void testInjectDependencies() {
        assertNotNull(categoryGateway);
        assertNotNull(categoryRepository);
    }

    @Test
    public void testCreateCategory() {
        var expectedCategoryName = "any-category";
        var expectedCategoryDescription = "any-description";
        var expectedCategoryIsActive = true;
        var expectedCountBeforeCreateCategory = 0;
        var expectedCountAfterCreateCategory = 1;
        var category = Category.with(expectedCategoryName, expectedCategoryDescription, expectedCategoryIsActive);
        assertEquals(expectedCountBeforeCreateCategory, categoryRepository.count());
        this.categoryGateway.create(category);
        var existingCategory = this.categoryGateway.findById(category.getId());
        assertTrue(existingCategory.isPresent());
        assertEquals(category.getId(), existingCategory.get().getId());
        assertEquals(category.getName(), existingCategory.get().getName());
        assertEquals(category.getDescription(), existingCategory.get().getDescription());
        assertEquals(category.getActive(), existingCategory.get().getActive());
        assertNotNull(existingCategory.get().getCreatedAt());
        assertNotNull(existingCategory.get().getUpdatedAt());
        assertNull(existingCategory.get().getDeletedAt());
        assertEquals(expectedCountAfterCreateCategory, categoryRepository.count());
    }

    @Test
    public void testUpdateCategory() {
        var expectedCategoryName = "any-category";
        var expectedCategoryDescription = "any-description";
        var expectedCategoryIsActive = true;
        var category = Category.with(expectedCategoryName, expectedCategoryDescription, expectedCategoryIsActive);
        this.categoryGateway.create(category);
        var existingCategory = this.categoryGateway.findById(category.getId());
        assertTrue(existingCategory.isPresent());
        assertEquals(category.getId(), existingCategory.get().getId());
        assertEquals(category.getName(), existingCategory.get().getName());
        assertEquals(category.getDescription(), existingCategory.get().getDescription());
        assertEquals(category.getActive(), existingCategory.get().getActive());
        assertNotNull(existingCategory.get().getCreatedAt());
        assertNotNull(existingCategory.get().getUpdatedAt());
        assertNull(existingCategory.get().getDeletedAt());
        var updatedCategoryName = "updated-category";
        var updatedCategoryDescription = "updated-description";
        existingCategory.get().update(updatedCategoryName, updatedCategoryDescription, expectedCategoryIsActive);
        this.categoryGateway.update(existingCategory.get());
        var updatedCategory = this.categoryGateway.findById(category.getId());
        assertTrue(updatedCategory.isPresent());
        assertEquals(category.getId(), updatedCategory.get().getId());
        assertEquals(updatedCategoryName, updatedCategory.get().getName());
        assertEquals(updatedCategoryDescription, updatedCategory.get().getDescription());
        assertNotNull(updatedCategory.get().getCreatedAt());
        assertNotNull(updatedCategory.get().getUpdatedAt());
        assertNull(updatedCategory.get().getDeletedAt());
    }

    @Test
    public void testUpdateDeactivateCategory() {
        var expectedCategoryName = "any-category";
        var expectedCategoryDescription = "any-description";
        var expectedCategoryIsActive = true;
        var category = Category.with(expectedCategoryName, expectedCategoryDescription, expectedCategoryIsActive);
        this.categoryGateway.create(category);
        var existingCategory = this.categoryGateway.findById(category.getId());
        assertTrue(existingCategory.isPresent());
        assertEquals(category.getId(), existingCategory.get().getId());
        assertEquals(category.getName(), existingCategory.get().getName());
        assertEquals(category.getDescription(), existingCategory.get().getDescription());
        assertEquals(category.getActive(), existingCategory.get().getActive());
        assertNotNull(existingCategory.get().getCreatedAt());
        assertNotNull(existingCategory.get().getUpdatedAt());
        assertNull(existingCategory.get().getDeletedAt());
        var updatedCategoryName = "updated-category";
        var updatedCategoryDescription = "updated-description";
        var updatedCategoryIsActive = false;
        existingCategory.get().update(updatedCategoryName, updatedCategoryDescription, updatedCategoryIsActive);
        this.categoryGateway.update(existingCategory.get());
        var updatedCategory = this.categoryGateway.findById(category.getId());
        assertTrue(updatedCategory.isPresent());
        assertEquals(category.getId(), updatedCategory.get().getId());
        assertEquals(updatedCategoryName, updatedCategory.get().getName());
        assertEquals(updatedCategoryDescription, updatedCategory.get().getDescription());
        assertFalse(updatedCategory.get().getActive());
        assertNotNull(updatedCategory.get().getCreatedAt());
        assertNotNull(updatedCategory.get().getUpdatedAt());
        assertNotNull(updatedCategory.get().getDeletedAt());
    }

    @Test
    public void testDeleteCategory() {
        var expectedCategoryName = "any-category";
        var expectedCategoryDescription = "any-description";
        var expectedCategoryIsActive = true;
        var category = Category.with(expectedCategoryName, expectedCategoryDescription, expectedCategoryIsActive);
        this.categoryGateway.create(category);
        var existingCategory = this.categoryGateway.findById(category.getId());
        assertTrue(existingCategory.isPresent());
        assertEquals(category.getId(), existingCategory.get().getId());
        assertEquals(category.getName(), existingCategory.get().getName());
        assertEquals(category.getDescription(), existingCategory.get().getDescription());
        assertEquals(category.getActive(), existingCategory.get().getActive());
        assertNotNull(existingCategory.get().getCreatedAt());
        assertNotNull(existingCategory.get().getUpdatedAt());
        assertNull(existingCategory.get().getDeletedAt());
        this.categoryGateway.deleteById(category.getId());
        var deletedCategory = this.categoryGateway.findById(category.getId());
        assertFalse(deletedCategory.isPresent());
    }

    @Test
    public void testFindAllCategoriesWhenFirstPage() {
        var expectedPage = 0;
        var expectedPerPage = 1;
        var expectedTotal = 3;
        var filmes = Category.with("Filmes", null, true);
        var series = Category.with("Séries", null, true);
        var documentarios = Category.with("Documentários", null, true);
        this.categoryGateway.create(filmes);
        this.categoryGateway.create(series);
        this.categoryGateway.create(documentarios);
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, "", "name", "asc");
        var categories = this.categoryGateway.findAll(query);
        assertEquals(expectedPage, categories.currentPage());
        assertEquals(expectedPerPage, categories.perPage());
        assertEquals(expectedTotal, categories.total());
        assertEquals(documentarios.getId(), categories.items().getFirst().getId());
    }

    @Test
    public void testFindAllCategoriesWhenEmpty() {
        var expectedPage = 0;
        var expectedPerPage = 1;
        var expectedTotal = 0;
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, "", "name", "asc");
        var categories = this.categoryGateway.findAll(query);
        assertEquals(expectedPage, categories.currentPage());
        assertEquals(expectedPerPage, categories.perPage());
        assertEquals(expectedTotal, categories.items().size());
    }

    @Test
    public void testFindAllCategoriesWhenSecondPage() {
        var expectedPage = 1;
        var expectedPerPage = 1;
        var expectedTotal = 3;
        var filmes = Category.with("Filmes", null, true);
        var series = Category.with("Séries", null, true);
        var documentarios = Category.with("Documentários", null, true);
        this.categoryGateway.create(filmes);
        this.categoryGateway.create(series);
        this.categoryGateway.create(documentarios);
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, "", "name", "asc");
        var categories = this.categoryGateway.findAll(query);
        assertEquals(expectedPage, categories.currentPage());
        assertEquals(expectedPerPage, categories.perPage());
        assertEquals(expectedTotal, categories.total());
        assertEquals(filmes.getId(), categories.items().getFirst().getId());
    }

    @Test
    public void testFindAllCategoriesWhenTermsName() {
        var expectedPage = 0;
        var expectedPerPage = 1;
        var expectedTotal = 1;
        var filmes = Category.with("Filmes", null, true);
        var series = Category.with("Séries", null, true);
        var documentarios = Category.with("Documentários", null, true);
        this.categoryGateway.create(filmes);
        this.categoryGateway.create(series);
        this.categoryGateway.create(documentarios);
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, "sér", "name", "asc");
        var categories = this.categoryGateway.findAll(query);
        assertEquals(expectedPage, categories.currentPage());
        assertEquals(expectedPerPage, categories.perPage());
        assertEquals(expectedTotal, categories.total());
        assertEquals(series.getId(), categories.items().getFirst().getId());
    }

    @Test
    public void testFindAllCategoriesWhenTermsDescription() {
        var expectedPage = 0;
        var expectedPerPage = 1;
        var expectedTotal = 1;
        var filmes = Category.with("Filmes", "Categoria mais assistida", true);
        var series = Category.with("Séries", null, true);
        var documentarios = Category.with("Documentários", null, true);
        this.categoryGateway.create(filmes);
        this.categoryGateway.create(series);
        this.categoryGateway.create(documentarios);
        var query = new CategorySearchQuery(expectedPage, expectedPerPage, "MAIS ASSISTIDA", "name", "asc");
        var categories = this.categoryGateway.findAll(query);
        assertEquals(expectedPage, categories.currentPage());
        assertEquals(expectedPerPage, categories.perPage());
        assertEquals(expectedTotal, categories.total());
        assertEquals(filmes.getId(), categories.items().getFirst().getId());
    }
}
