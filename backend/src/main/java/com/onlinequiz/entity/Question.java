package com.onlinequiz.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options = new ArrayList<>();

    public Question() {}

    public Long getId() { return id; }
    public String getQuestionText() { return questionText; }
    public Quiz getQuiz() { return quiz; }
    public List<Option> getOptions() { return options; }

    public void setId(Long id) { this.id = id; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
    public void setOptions(List<Option> options) { this.options = options; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String questionText;
        private Quiz quiz;
        public Builder questionText(String v) { this.questionText = v; return this; }
        public Builder quiz(Quiz v) { this.quiz = v; return this; }
        public Question build() {
            Question q = new Question();
            q.questionText = questionText; q.quiz = quiz;
            return q;
        }
    }
}
