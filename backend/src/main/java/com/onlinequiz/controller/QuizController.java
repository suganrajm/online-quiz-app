package com.onlinequiz.controller;

import com.onlinequiz.dto.QuizDTO;
import com.onlinequiz.dto.QuestionDTO;
import com.onlinequiz.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/quizzes")
    public ResponseEntity<List<QuizDTO.QuizSummary>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<QuizDTO.QuizDetail> getQuiz(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @GetMapping("/admin/quizzes")
    public ResponseEntity<List<QuizDTO.QuizSummary>> adminGetAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/admin/quizzes/{id}")
    public ResponseEntity<QuizDTO.QuizDetail> adminGetQuiz(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizForAdmin(id));
    }

    @PostMapping("/admin/quizzes")
    public ResponseEntity<QuizDTO.QuizSummary> createQuiz(@RequestBody QuizDTO.CreateQuizRequest request) {
        return ResponseEntity.ok(quizService.createQuiz(request));
    }

    @PutMapping("/admin/quizzes/{id}")
    public ResponseEntity<QuizDTO.QuizSummary> updateQuiz(@PathVariable Long id, @RequestBody QuizDTO.CreateQuizRequest request) {
        return ResponseEntity.ok(quizService.updateQuiz(id, request));
    }

    @DeleteMapping("/admin/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/admin/quizzes/{quizId}/questions")
    public ResponseEntity<QuestionDTO.QuestionDetail> addQuestion(@PathVariable Long quizId, @RequestBody QuestionDTO.CreateQuestionRequest request) {
        return ResponseEntity.ok(quizService.addQuestion(quizId, request));
    }

    @PutMapping("/admin/questions/{questionId}")
    public ResponseEntity<QuestionDTO.QuestionDetail> updateQuestion(@PathVariable Long questionId, @RequestBody QuestionDTO.CreateQuestionRequest request) {
        return ResponseEntity.ok(quizService.updateQuestion(questionId, request));
    }

    @DeleteMapping("/admin/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        quizService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
}
