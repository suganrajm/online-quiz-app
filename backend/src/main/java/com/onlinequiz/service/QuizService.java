package com.onlinequiz.service;

import com.onlinequiz.dto.QuizDTO;
import com.onlinequiz.dto.QuestionDTO;
import com.onlinequiz.entity.Option;
import com.onlinequiz.entity.Question;
import com.onlinequiz.entity.Quiz;
import com.onlinequiz.entity.User;
import com.onlinequiz.repository.QuestionRepository;
import com.onlinequiz.repository.QuizRepository;
import com.onlinequiz.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public List<QuizDTO.QuizSummary> getAllQuizzes() {
        return quizRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(quiz -> QuizDTO.QuizSummary.builder()
                        .id(quiz.getId())
                        .title(quiz.getTitle())
                        .description(quiz.getDescription())
                        .timeLimitMinutes(quiz.getTimeLimitMinutes())
                        .questionCount(quiz.getQuestions() != null ? quiz.getQuestions().size() : 0)
                        .createdAt(quiz.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public QuizDTO.QuizDetail getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<QuestionDTO.QuestionDetail> questions = quiz.getQuestions().stream()
                .map(q -> QuestionDTO.QuestionDetail.builder()
                        .id(q.getId())
                        .questionText(q.getQuestionText())
                        .options(q.getOptions().stream()
                                .map(o -> QuestionDTO.OptionDTO.builder()
                                        .id(o.getId())
                                        .optionText(o.getOptionText())
                                        .isCorrect(false)
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        return QuizDTO.QuizDetail.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .timeLimitMinutes(quiz.getTimeLimitMinutes())
                .questions(questions)
                .build();
    }

    public QuizDTO.QuizDetail getQuizForAdmin(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<QuestionDTO.QuestionDetail> questions = quiz.getQuestions().stream()
                .map(q -> QuestionDTO.QuestionDetail.builder()
                        .id(q.getId())
                        .questionText(q.getQuestionText())
                        .options(q.getOptions().stream()
                                .map(o -> QuestionDTO.OptionDTO.builder()
                                        .id(o.getId())
                                        .optionText(o.getOptionText())
                                        .isCorrect(o.getIsCorrect())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        return QuizDTO.QuizDetail.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .timeLimitMinutes(quiz.getTimeLimitMinutes())
                .questions(questions)
                .build();
    }

    @Transactional
    public QuizDTO.QuizSummary createQuiz(QuizDTO.CreateQuizRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User admin = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = Quiz.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .timeLimitMinutes(request.getTimeLimitMinutes())
                .createdBy(admin)
                .build();

        quiz = quizRepository.save(quiz);
        return QuizDTO.QuizSummary.builder()
                .id(quiz.getId())
                .title(quiz.getTitle())
                .description(quiz.getDescription())
                .timeLimitMinutes(quiz.getTimeLimitMinutes())
                .questionCount(0)
                .createdAt(quiz.getCreatedAt())
                .build();
    }

    @Transactional
    public QuizDTO.QuizSummary updateQuiz(Long id, QuizDTO.CreateQuizRequest request) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setTimeLimitMinutes(request.getTimeLimitMinutes());
        quiz = quizRepository.save(quiz);
        return QuizDTO.QuizSummary.builder()
                .id(quiz.getId()).title(quiz.getTitle()).description(quiz.getDescription())
                .timeLimitMinutes(quiz.getTimeLimitMinutes())
                .questionCount(quiz.getQuestions() != null ? quiz.getQuestions().size() : 0)
                .createdAt(quiz.getCreatedAt()).build();
    }

    @Transactional
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    @Transactional
    public QuestionDTO.QuestionDetail addQuestion(Long quizId, QuestionDTO.CreateQuestionRequest request) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Question question = Question.builder()
                .questionText(request.getQuestionText())
                .quiz(quiz)
                .build();

        question = questionRepository.save(question);
        final Question savedQuestion = question;

        List<Option> options = new ArrayList<>();
        for (QuestionDTO.CreateOptionRequest opt : request.getOptions()) {
            Option o = Option.builder()
                    .optionText(opt.getOptionText())
                    .isCorrect(opt.getIsCorrect())
                    .question(savedQuestion)
                    .build();
            options.add(o);
        }
        savedQuestion.setOptions(options);
        questionRepository.save(savedQuestion);

        return toQuestionDetail(savedQuestion, true);
    }

    @Transactional
    public void deleteQuestion(Long questionId) {
        questionRepository.deleteById(questionId);
    }

    @Transactional
    public QuestionDTO.QuestionDetail updateQuestion(Long questionId, QuestionDTO.CreateQuestionRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        question.setQuestionText(request.getQuestionText());
        question.getOptions().clear();

        for (QuestionDTO.CreateOptionRequest opt : request.getOptions()) {
            Option o = Option.builder()
                    .optionText(opt.getOptionText())
                    .isCorrect(opt.getIsCorrect())
                    .question(question)
                    .build();
            question.getOptions().add(o);
        }

        Question saved = questionRepository.save(question);
        return toQuestionDetail(saved, true);
    }

    private QuestionDTO.QuestionDetail toQuestionDetail(Question q, boolean showCorrect) {
        List<QuestionDTO.OptionDTO> optionDTOs = q.getOptions().stream()
                .map(o -> QuestionDTO.OptionDTO.builder()
                        .id(o.getId())
                        .optionText(o.getOptionText())
                        .isCorrect(showCorrect ? o.getIsCorrect() : false)
                        .build())
                .collect(Collectors.toList());
        return QuestionDTO.QuestionDetail.builder()
                .id(q.getId())
                .questionText(q.getQuestionText())
                .options(optionDTOs)
                .build();
    }
}
