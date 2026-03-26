package com.onlinequiz.service;

import com.onlinequiz.dto.AttemptDTO;
import com.onlinequiz.entity.*;
import com.onlinequiz.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AttemptService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public AttemptService(QuizRepository quizRepository, UserRepository userRepository,
                          QuizAttemptRepository quizAttemptRepository) {
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @Transactional
    public AttemptDTO.AttemptResult submitAttempt(AttemptDTO.SubmitAttemptRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<Question> questions = quiz.getQuestions();
        Map<Long, Long> answerMap = request.getAnswers().stream()
                .filter(a -> a.getSelectedOptionId() != null)
                .collect(Collectors.toMap(AttemptDTO.AnswerRequest::getQuestionId, AttemptDTO.AnswerRequest::getSelectedOptionId));

        int correct = 0, wrong = 0, skipped = 0;
        List<AttemptDTO.QuestionResult> questionResults = new ArrayList<>();

        for (Question question : questions) {
            Long selectedOptionId = answerMap.get(question.getId());
            Option correctOption = question.getOptions().stream()
                    .filter(Option::getIsCorrect)
                    .findFirst()
                    .orElse(null);

            boolean isSkipped = selectedOptionId == null;
            boolean isCorrect = false;

            if (isSkipped) {
                skipped++;
            } else {
                isCorrect = correctOption != null && correctOption.getId().equals(selectedOptionId);
                if (isCorrect) correct++;
                else wrong++;
            }

            questionResults.add(AttemptDTO.QuestionResult.builder()
                    .questionId(question.getId())
                    .questionText(question.getQuestionText())
                    .selectedOptionId(selectedOptionId)
                    .correctOptionId(correctOption != null ? correctOption.getId() : null)
                    .isCorrect(isCorrect)
                    .isSkipped(isSkipped)
                    .build());
        }

        int total = questions.size();
        int score = total > 0 ? (int) Math.round(((double) correct / total) * 100) : 0;

        QuizAttempt attempt = QuizAttempt.builder()
                .user(user).quiz(quiz).score(score)
                .totalQuestions(total).correctAnswers(correct)
                .wrongAnswers(wrong).skippedAnswers(skipped)
                .build();

        attempt = quizAttemptRepository.save(attempt);

        return AttemptDTO.AttemptResult.builder()
                .attemptId(attempt.getId())
                .quizTitle(quiz.getTitle())
                .totalQuestions(total).correctAnswers(correct)
                .wrongAnswers(wrong).skippedAnswers(skipped)
                .score(score).submittedAt(attempt.getSubmittedAt())
                .questionResults(questionResults)
                .build();
    }

    public AttemptDTO.AttemptResult getAttemptResult(Long attemptId) {
        QuizAttempt attempt = quizAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        return AttemptDTO.AttemptResult.builder()
                .attemptId(attempt.getId())
                .quizTitle(attempt.getQuiz().getTitle())
                .totalQuestions(attempt.getTotalQuestions())
                .correctAnswers(attempt.getCorrectAnswers())
                .wrongAnswers(attempt.getWrongAnswers())
                .skippedAnswers(attempt.getSkippedAnswers())
                .score(attempt.getScore())
                .submittedAt(attempt.getSubmittedAt())
                .build();
    }

    public List<AttemptDTO.AttemptResult> getUserAttempts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return quizAttemptRepository.findByUserId(user.getId()).stream()
                .map(a -> AttemptDTO.AttemptResult.builder()
                        .attemptId(a.getId())
                        .quizTitle(a.getQuiz().getTitle())
                        .totalQuestions(a.getTotalQuestions())
                        .correctAnswers(a.getCorrectAnswers())
                        .wrongAnswers(a.getWrongAnswers())
                        .skippedAnswers(a.getSkippedAnswers())
                        .score(a.getScore())
                        .submittedAt(a.getSubmittedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
