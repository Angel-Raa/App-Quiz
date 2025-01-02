package com.github.angel.raa.utils;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CorrectAnswersValidator.class)
public @interface ValidCorrectAnswers {
    String message() default "Correct answers must be part of choices";
    Class<?>[] groups() default {};
    Class<? extends Payload>[]payload() default {};

}
