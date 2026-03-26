package com.onlinequiz.dto;

import java.time.LocalDateTime;
import java.util.List;

public class QuizDTO {

    public static class QuizSummary {
        private Long id;
        private String title, description;
        private Integer timeLimitMinutes, questionCount;
        private LocalDateTime createdAt;

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
        public Integer getQuestionCount() { return questionCount; }
        public LocalDateTime getCreatedAt() { return createdAt; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final QuizSummary r = new QuizSummary();
            public Builder id(Long v) { r.id = v; return this; }
            public Builder title(String v) { r.title = v; return this; }
            public Builder description(String v) { r.description = v; return this; }
            public Builder timeLimitMinutes(Integer v) { r.timeLimitMinutes = v; return this; }
            public Builder questionCount(Integer v) { r.questionCount = v; return this; }
            public Builder createdAt(LocalDateTime v) { r.createdAt = v; return this; }
            public QuizSummary build() { return r; }
        }
    }

    public static class QuizDetail {
        private Long id;
        private String title, description;
        private Integer timeLimitMinutes;
        private List<QuestionDTO.QuestionDetail> questions;

        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
        public List<QuestionDTO.QuestionDetail> getQuestions() { return questions; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final QuizDetail r = new QuizDetail();
            public Builder id(Long v) { r.id = v; return this; }
            public Builder title(String v) { r.title = v; return this; }
            public Builder description(String v) { r.description = v; return this; }
            public Builder timeLimitMinutes(Integer v) { r.timeLimitMinutes = v; return this; }
            public Builder questions(List<QuestionDTO.QuestionDetail> v) { r.questions = v; return this; }
            public QuizDetail build() { return r; }
        }
    }

    public static class CreateQuizRequest {
        private String title, description;
        private Integer timeLimitMinutes;
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public Integer getTimeLimitMinutes() { return timeLimitMinutes; }
        public void setTitle(String v) { this.title = v; }
        public void setDescription(String v) { this.description = v; }
        public void setTimeLimitMinutes(Integer v) { this.timeLimitMinutes = v; }
    }
}
