package com.onlinequiz.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "options")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionText;

    @Column(nullable = false)
    private Boolean isCorrect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    public Option() {}

    public Long getId() { return id; }
    public String getOptionText() { return optionText; }
    public Boolean getIsCorrect() { return isCorrect; }
    public Question getQuestion() { return question; }

    public void setId(Long id) { this.id = id; }
    public void setOptionText(String optionText) { this.optionText = optionText; }
    public void setIsCorrect(Boolean isCorrect) { this.isCorrect = isCorrect; }
    public void setQuestion(Question question) { this.question = question; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String optionText;
        private Boolean isCorrect;
        private Question question;
        public Builder optionText(String v) { this.optionText = v; return this; }
        public Builder isCorrect(Boolean v) { this.isCorrect = v; return this; }
        public Builder question(Question v) { this.question = v; return this; }
        public Option build() {
            Option o = new Option();
            o.optionText = optionText; o.isCorrect = isCorrect; o.question = question;
            return o;
        }
    }
}
