package com.example.infraestructure;

import com.example.application.UseCase;

public class Main {
    public static void main(String[] args) throws Exception {
        var usecase = new UseCase();
        System.out.println(usecase.Execute());
    }
}