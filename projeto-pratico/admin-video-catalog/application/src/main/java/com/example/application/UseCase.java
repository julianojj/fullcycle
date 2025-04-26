package com.example.application;

import com.example.validation.handler.Notification;
import io.vavr.control.Either;

public abstract class UseCase<Input, Output> {
    public abstract Either<Notification, Output> execute(Input input);
}
