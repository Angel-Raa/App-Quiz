package com.github.angel.raa.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.github.angel.raa.utils.ValidCorrectAnswers;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ValidCorrectAnswers
public class QuestionDTO {
    private Long questionId;
    @NotBlank(message = "Question is required")
    @Size(max = 100, message = "Question must not exceed 100 characters")
    private String question;

    @NotBlank(message = "Subject is required")
    @Size(max = 250, message = "Subject must not exceed 250 characters")
    private String subject;

    @NotBlank(message = "Question type is required")
    @Size(max = 250, message = "Question type must not exceed 250 characters")
    private String questionType;

    @NotNull(message = "Choices are required")
    @Size(min = 1, message = "At least one choice is required")
    private List<String> choices;

    @NotNull(message = "Correct answers are required")
    @Size(min = 1, message = "At least one correct answer is required")
    private List<String> correctAnswers;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime updatedAt;

    public QuestionDTO() {
    }

    public QuestionDTO(Long questionId, String question, String subject, String questionType, List<String> choices, List<String> correctAnswers) {
        this.questionId = questionId;
        this.question = question;
        this.subject = subject;
        this.questionType = questionType;
        this.choices = choices != null ? choices : new ArrayList<>();
        this.correctAnswers = correctAnswers != null ? correctAnswers : new ArrayList<>();
    }

    public QuestionDTO(Long questionId, String question, String subject, String questionType, List<String> choices, List<String> correctAnswers, LocalDateTime createAt, LocalDateTime updatedAt) {
        this.questionId = questionId;
        this.question = question;
        this.subject = subject;
        this.questionType = questionType;
        this.choices = choices;
        this.correctAnswers = correctAnswers;
        this.createAt = createAt;
        this.updatedAt = updatedAt;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
                "questionId=" + questionId +
                ", question='" + question + '\'' +
                ", subject='" + subject + '\'' +
                ", questionType='" + questionType + '\'' +
                ", choices=" + choices +
                ", correctAnswers=" + correctAnswers +
                '}';
    }
}
