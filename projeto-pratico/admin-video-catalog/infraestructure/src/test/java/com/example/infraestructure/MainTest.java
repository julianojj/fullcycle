package com.example.infraestructure;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MainTest {

    @Test
    public void newMain() {
        var main = new Main();
        assertNotNull(main);
        assertInstanceOf(Main.class, main);
    }

}