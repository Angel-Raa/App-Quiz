package com.github.angel.raa.utils;

import com.github.angel.raa.dto.QuestionDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.jetbrains.annotations.NotNull;

public class CorrectAnswersValidator implements ConstraintValidator<ValidCorrectAnswers, QuestionDTO> {
    @Override
    public boolean isValid(@NotNull QuestionDTO questionDTO, ConstraintValidatorContext constraintValidatorContext) {
        if(questionDTO.getCorrectAnswers() == null || questionDTO.getCorrectAnswers().isEmpty() || questionDTO.getChoices() == null || questionDTO.getChoices().isEmpty()) {
            return false;
        }
        return questionDTO.getCorrectAnswers().stream().allMatch(questionDTO.getChoices()::contains);
    }
}
