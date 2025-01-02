package com.github.angel.raa.repository;

import com.github.angel.raa.dto.QuestionDTO;
import com.github.angel.raa.entity.Question;
import io.hypersistence.utils.spring.repository.BaseJpaRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends BaseJpaRepository<Question, Long>, ListPagingAndSortingRepository<Question, Long> {
    Optional<Question> findByQuestionIgnoreCase(String question);
    @NotNull Page<Question> findAll(Pageable pageable);
    Page<Question> findBySubject(@Param("subject") String subject, Pageable pageable);
    Page<Question> findByQuestionType(@Param("questionType") String questionType, Pageable pageable);




}
