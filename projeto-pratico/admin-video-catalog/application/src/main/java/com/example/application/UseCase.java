package com.example.application;

public abstract class UseCase<Input, Output> {
    public abstract Output execute(Input input);
}
