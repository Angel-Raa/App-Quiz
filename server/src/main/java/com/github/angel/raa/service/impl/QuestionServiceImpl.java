package com.github.angel.raa.service.impl;

import com.github.angel.raa.dto.QuestionDTO;
import com.github.angel.raa.entity.Question;
import com.github.angel.raa.exception.QuestionNotFoundException;
import com.github.angel.raa.repository.QuestionRepository;
import com.github.angel.raa.service.QuestionService;
import com.github.angel.raa.utils.Response;
import com.github.angel.raa.utils.ResponseBuilder;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository repository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public void saveAllQuestions(List<QuestionDTO> dtoList) {
        List<Question> questions = dtoList.stream().map((dto) -> {
            Question question = new Question();
            question.setQuestion(dto.getQuestion());
            question.setSubject(dto.getSubject());
            question.setQuestionType(dto.getQuestionType());
            question.setChoices(dto.getChoices());
            question.setCorrectAnswers(dto.getCorrectAnswers());
            return question;
        }).toList();
        repository.persistAll(questions);

    }

    @Transactional(readOnly = true)
    @Override
    public Page<QuestionDTO> getQuestionsForUser( String subject, String questionType, Pageable pageable) {
        return null;
    }

    @Transactional
    @Override
    public Response<QuestionDTO> addQuestion(@NotNull QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestion(questionDTO.getQuestion());
        question.setSubject(questionDTO.getSubject());
        question.setQuestionType(questionDTO.getQuestionType());
        question.setChoices(questionDTO.getChoices());
        question.setCorrectAnswers(questionDTO.getCorrectAnswers());
        repository.persist(question);
       return ResponseBuilder.buildResponse(
         mapToDTO(question),
         "Question added successfully",
               true,
               201
       );
    }
    @Transactional
    @Override
    public Response<QuestionDTO> updateQuestion(Long questionId, QuestionDTO questionDTO) {

       return repository.findById(questionId).map((q) -> {
           updateQuestionFromDTO(q, questionDTO);
            q.setQuestionId(questionId);
           repository.update(q);
           return ResponseBuilder.buildResponse(
                     mapToDTO(q),
                     "Question updated successfully",
                     true,
                     200
           );
       }).orElseThrow(() -> new QuestionNotFoundException("Question not found"));

    }

    @Transactional
    @Override
    public Response<QuestionDTO> deleteQuestion(Long questionId) {
        return repository.findById(questionId).map((q) -> {
            repository.delete(q);
            return ResponseBuilder.buildResponse(
                    mapToDTO(q),
                    "Question deleted successfully",
                    true,
                    200
            );
        }).orElseThrow(() -> new QuestionNotFoundException("Question not found"));
    }
    @Transactional(readOnly = true)
    @Override
    public Page<QuestionDTO> getAllQuestions(Pageable pageable) {
        return repository.findAll(pageable).map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<QuestionDTO> getAllSubjects(Pageable pageable) {
        return null;
    }

    @Transactional(readOnly = true)
    @Override
    public QuestionDTO getQuestion(Long questionId) {
        return repository.findById(questionId).map(this::mapToDTO).orElseThrow(() -> new QuestionNotFoundException("Question not found"));
    }
    @Transactional(readOnly = true)
    @Override
    public QuestionDTO getQuestion(String question) {
        return repository.findByQuestionIgnoreCase(question).map(this::mapToDTO).orElseThrow(() -> new QuestionNotFoundException("Question not found"));
    }
    @Transactional(readOnly = true)
    @Override
    public Page<QuestionDTO> getQuestionsBySubject(String subject, Pageable pageable) {
        return repository.findBySubject(subject, pageable).map(this::mapToDTO);
    }
    @Transactional(readOnly = true)
    @Override
    public Page<QuestionDTO> getQuestionsByQuestionType(String questionType, Pageable pageable) {
        return  repository.findByQuestionType(questionType, pageable).map(this::mapToDTO);
    }


    @org.jetbrains.annotations.NotNull
    @org.jetbrains.annotations.Contract("_ -> new")
    private QuestionDTO mapToDTO(@NotNull Question question) {
        return new QuestionDTO(
                question.getQuestionId(),
                question.getQuestion(),
                question.getSubject(),
                question.getQuestionType(),
                question.getChoices(),
                question.getCorrectAnswers(),
                question.getCreateAt(),
                question.getUpdatedAt()
        );
    }

    // Método separado para actualizar la entidad desde el DTO
    private void updateQuestionFromDTO(@NotNull Question question, @NotNull QuestionDTO questionDTO) {
        question.setQuestion(questionDTO.getQuestion());
        question.setSubject(questionDTO.getSubject());
        question.setQuestionType(questionDTO.getQuestionType());
        question.setChoices(questionDTO.getChoices());
        question.setCorrectAnswers(questionDTO.getCorrectAnswers());
        question.setUpdatedAt(questionDTO.getUpdatedAt());
    }
}
