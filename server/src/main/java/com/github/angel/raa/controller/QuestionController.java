package com.github.angel.raa.controller;

import com.github.angel.raa.dto.QuestionDTO;
import com.github.angel.raa.service.QuestionService;
import com.github.angel.raa.utils.Response;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Validated
@RequestMapping("/api/v1/questions")
@RestController
@CrossOrigin(origins = """
        http://localhost:5173""")
public class QuestionController {
    private static final Logger log = LogManager.getLogger(QuestionController.class);
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @GetMapping
    public ResponseEntity<Page<QuestionDTO>> getAllQuestions(@RequestParam(name = "page", defaultValue = "0", required = false) int page, @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok(questionService.getAllQuestions(PageRequest.of(page, size, Sort.sort(QuestionDTO.class))));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDTO> getQuestion(@PathVariable(name = "questionId") Long questionId) {
        return ResponseEntity.ok(questionService.getQuestion(questionId));
    }

    @GetMapping("/search")
    public ResponseEntity<QuestionDTO> getQuestion(@RequestParam(name = "question") @NotBlank(message = "El campo question no puede esta vacio") String question) {
        return ResponseEntity.ok(questionService.getQuestion(question));
    }

    @GetMapping("/subjects")
    public ResponseEntity<Page<QuestionDTO>> getQuestionsBySubject(@RequestParam(name = "subject") String subject, @RequestParam(name = "page", defaultValue = "0", required = false) int page, @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok(questionService.getQuestionsBySubject(subject, PageRequest.of(page, size)));
    }

    @GetMapping("/types")
    public ResponseEntity<Page<QuestionDTO>> getQuestionsByQuestionType(@RequestParam(name = "type") String type, @RequestParam(name = "page", defaultValue = "0", required = false) int page, @RequestParam(name = "size", defaultValue = "10", required = false) int size) {
        return ResponseEntity.ok(questionService.getQuestionsByQuestionType(type, PageRequest.of(page, size)));
    }

    @PostMapping
    public ResponseEntity<Response<QuestionDTO>> create(@Valid @RequestBody QuestionDTO questionDTO) {
        Response<QuestionDTO> response = questionService.addQuestion(questionDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{questionId}")
                .buildAndExpand(response.getData().getQuestionId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return ResponseEntity.created(location).headers(headers).body(response);
    }
    @PostMapping("/bulk")
    public ResponseEntity<Void> saveAllQuestions(@Valid @RequestBody List<QuestionDTO> dtoList) {
        questionService.saveAllQuestions(dtoList);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<Response<QuestionDTO>> update(@PathVariable Long questionId, @Valid @RequestBody QuestionDTO questionDTO) {
        Response<QuestionDTO> response = questionService.updateQuestion(questionId,questionDTO);
        log.info(questionDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{questionId}")
                .buildAndExpand(response.getData().getQuestionId())
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return ResponseEntity.created(location).headers(headers).body(response);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Response<QuestionDTO>> delete(@PathVariable Long questionId) {
        return new ResponseEntity<>(questionService.deleteQuestion(questionId), HttpStatus.NO_CONTENT);
    }


}
