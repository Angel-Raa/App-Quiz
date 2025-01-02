package com.github.angel.raa.service;

import com.github.angel.raa.dto.QuestionDTO;
import com.github.angel.raa.exception.QuestionNotFoundException;
import com.github.angel.raa.utils.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface QuestionService {
    void saveAllQuestions(List<QuestionDTO> dtoList);
    Page<QuestionDTO> getQuestionsForUser( String subject, String questionType, Pageable pageable);
    Response<QuestionDTO> addQuestion(QuestionDTO questionDTO);
    Response<QuestionDTO> updateQuestion( Long questionId,QuestionDTO questionDTO);
    Response<QuestionDTO> deleteQuestion(Long questionId);
    Page<QuestionDTO> getAllQuestions(Pageable pageable);
    Page<QuestionDTO> getAllSubjects(Pageable pageable);
    QuestionDTO getQuestion(Long questionId) throws QuestionNotFoundException;
    QuestionDTO getQuestion(String question) throws QuestionNotFoundException;
    Page<QuestionDTO> getQuestionsBySubject(String subject, Pageable pageable);
    Page<QuestionDTO> getQuestionsByQuestionType(String questionType, Pageable pageable);





}
