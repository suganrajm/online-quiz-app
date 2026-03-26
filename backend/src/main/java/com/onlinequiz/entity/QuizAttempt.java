package com.onlinequiz.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer totalQuestions;

    @Column(nullable = false)
    private Integer correctAnswers;

    @Column(nullable = false)
    private Integer wrongAnswers;

    @Column(nullable = false)
    private Integer skippedAnswers;

    @Column(nullable = false)
    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        submittedAt = LocalDateTime.now();
    }

    public QuizAttempt() {}

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Quiz getQuiz() { return quiz; }
    public Integer getScore() { return score; }
    public Integer getTotalQuestions() { return totalQuestions; }
    public Integer getCorrectAnswers() { return correctAnswers; }
    public Integer getWrongAnswers() { return wrongAnswers; }
    public Integer getSkippedAnswers() { return skippedAnswers; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
    public void setScore(Integer score) { this.score = score; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }
    public void setWrongAnswers(Integer wrongAnswers) { this.wrongAnswers = wrongAnswers; }
    public void setSkippedAnswers(Integer skippedAnswers) { this.skippedAnswers = skippedAnswers; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private User user; private Quiz quiz;
        private Integer score, totalQuestions, correctAnswers, wrongAnswers, skippedAnswers;
        public Builder user(User v) { this.user = v; return this; }
        public Builder quiz(Quiz v) { this.quiz = v; return this; }
        public Builder score(Integer v) { this.score = v; return this; }
        public Builder totalQuestions(Integer v) { this.totalQuestions = v; return this; }
        public Builder correctAnswers(Integer v) { this.correctAnswers = v; return this; }
        public Builder wrongAnswers(Integer v) { this.wrongAnswers = v; return this; }
        public Builder skippedAnswers(Integer v) { this.skippedAnswers = v; return this; }
        public QuizAttempt build() {
            QuizAttempt a = new QuizAttempt();
            a.user = user; a.quiz = quiz; a.score = score;
            a.totalQuestions = totalQuestions; a.correctAnswers = correctAnswers;
            a.wrongAnswers = wrongAnswers; a.skippedAnswers = skippedAnswers;
            return a;
        }
    }
}
