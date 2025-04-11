package com.example.application;

import com.example.domain.Category;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UseCaseTest {

    @Test
    public void testUsecase() throws Exception {
        var usecase = new UseCase();
        var output = usecase.Execute();
        assertInstanceOf(Category.class, output);
        assertNotNull(output.getId());
    }
}
