package com.example.domain;

import com.example.exceptions.DomainException;
import com.example.validation.handler.ThrowsValidationHandler;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryTest {

    @Test
    public void testNewCategoryWhenInvalidName() {
        var category = new Category("", null);
        var exception = assertThrows(DomainException.class, () -> {
           category.validate(new ThrowsValidationHandler());
        });
        assertEquals("name is required", exception.getErrors().getFirst().message());
    }

    @Test
    public void testNewCategoryWhenInvalidNameLengthWith3Characters() {
        var category = new Category("Te ", null);
        var exception = assertThrows(DomainException.class, () -> {
            category.validate(new ThrowsValidationHandler());
        });
        assertEquals("invalid name length", exception.getErrors().getFirst().message());
    }

    @Test
    public void testNewCategoryWhenInvalidNameLengthWithMore255Characters() {
        var category = new Category("Do mesmo modo, o novo modelo estrutural aqui preconizado talvez venha a ressaltar a relatividade das novas proposições. O que temos que ter sempre em mente é que a consolidação das estruturas assume importantes posições no estabelecimento dos procedimentos normalmente adotados. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que o julgamento imparcial das eventualidades facilita a criação dos índices pretendidos. No mundo atual, o comprometimento entre as equipes ainda não demonstrou convincentemente que vai participar na mudança das condições inegavelmente apropriadas.", null);
        var exception = assertThrows(DomainException.class, () -> {
            category.validate(new ThrowsValidationHandler());
        });
        assertEquals("invalid name length", exception.getErrors().getFirst().message());
    }

    @Test
    public void testNewCategory() {
        var expectedName = "Terror";
        var expectedDescription = "Filme de terror";
        var category = new Category("Terror", "Filme de terror");
        assertDoesNotThrow(() -> category.validate(new ThrowsValidationHandler()));
        assertNotNull(category.getId());
        assertEquals(expectedName, category.getName());
        assertEquals(expectedDescription, category.getDescription());
        assertTrue(category.getActive());
        assertNotNull(category.getCreatedAt());
        assertNotNull(category.getUpdatedAt());
        assertNull(category.getDeletedAt());
    }

    @Test
    public void testDeactivateCategory() {
        var category = new Category("Terror", "Filme de terror");
        assertTrue(category.getActive());
        category.Deactivate();
        assertFalse(category.getActive());
        assertNotNull(category.getDeletedAt());
    }

    @Test
    public void testActivateCategory() {
        var category = new Category("Terror", "Filme de terror");
        assertTrue(category.getActive());
        category.Deactivate();
        assertFalse(category.getActive());
        assertNotNull(category.getDeletedAt());
        category.Activate();
        assertTrue(category.getActive());
        assertNull(category.getDeletedAt());
    }

    @Test
    public void testShouldReturnErrorWhenUpdateCategoryWithInvalidName() {
        var category = new Category("Terror", "Filme de terror");
        var exception = assertThrows(DomainException.class, () -> {
            category.update("Te ", category.getDescription(), category.getActive());
        });
        assertEquals("invalid name length", exception.getErrors().getFirst().message());
    }

    @Test
    public void testUpdateCategory() {
        var expectedName = "Terror";
        var expectedUpdatedName = "Terror 2";
        var expectedDescription = "Filme de terror";
        var category = new Category(expectedName, expectedDescription);
        assertDoesNotThrow(() -> {
            category.validate(new ThrowsValidationHandler());
        });
        assertEquals(expectedName, category.getName());
        assertEquals(expectedDescription, category.getDescription());
        assertDoesNotThrow(() -> {
            category.update(expectedUpdatedName, category.getDescription(), false);
        });
        assertEquals("Terror 2", category.getName());
        assertEquals(expectedDescription, category.getDescription());
        assertNotNull(category.getDeletedAt());
    }
}
