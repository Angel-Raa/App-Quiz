package com.github.angel.raa.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Question")
@Table(name = "question_table", indexes = {
        @Index(name = "question_table_index", columnList = "question_id", unique = true)
})
public class Question implements Serializable {
    @Serial
    private static final long serialVersionUID = -2332789342879328971L;
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;
    @Column(nullable = false, length = 100, unique = true)
    private String question;

    @Column(nullable = false, length = 250)
    private String subject;
    @Column(nullable = false, length = 250)
    private String questionType;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "choices_table", joinColumns = @JoinColumn(name = "question_id"))
    private List<String> choices = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "correct_answers_table", joinColumns = @JoinColumn(name = "question_id"))
    private List<String> correctAnswers = new ArrayList<>();
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createAt;
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Question() {
    }

    public Question(Long questionId, String question, String subject, String questionType, List<String> choices, List<String> correctAnswers, LocalDateTime createAt, LocalDateTime updatedAt) {
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
        return "Question{" +
                "questionId=" + questionId +
                ", question='" + question + '\'' +
                ", subject='" + subject + '\'' +
                ", questionType='" + questionType + '\'' +
                ", choices=" + choices +
                ", correctAnswers=" + correctAnswers +
                ", createAt=" + createAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
