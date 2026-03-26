package com.onlinequiz.dto;

import java.time.LocalDateTime;
import java.util.List;

public class AttemptDTO {

    public static class SubmitAttemptRequest {
        private Long quizId;
        private List<AnswerRequest> answers;
        public Long getQuizId() { return quizId; }
        public List<AnswerRequest> getAnswers() { return answers; }
        public void setQuizId(Long v) { this.quizId = v; }
        public void setAnswers(List<AnswerRequest> v) { this.answers = v; }
    }

    public static class AnswerRequest {
        private Long questionId, selectedOptionId;
        public Long getQuestionId() { return questionId; }
        public Long getSelectedOptionId() { return selectedOptionId; }
        public void setQuestionId(Long v) { this.questionId = v; }
        public void setSelectedOptionId(Long v) { this.selectedOptionId = v; }
    }

    public static class AttemptResult {
        private Long attemptId;
        private String quizTitle;
        private Integer totalQuestions, correctAnswers, wrongAnswers, skippedAnswers, score;
        private LocalDateTime submittedAt;
        private List<QuestionResult> questionResults;

        public Long getAttemptId() { return attemptId; }
        public String getQuizTitle() { return quizTitle; }
        public Integer getTotalQuestions() { return totalQuestions; }
        public Integer getCorrectAnswers() { return correctAnswers; }
        public Integer getWrongAnswers() { return wrongAnswers; }
        public Integer getSkippedAnswers() { return skippedAnswers; }
        public Integer getScore() { return score; }
        public LocalDateTime getSubmittedAt() { return submittedAt; }
        public List<QuestionResult> getQuestionResults() { return questionResults; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final AttemptResult r = new AttemptResult();
            public Builder attemptId(Long v) { r.attemptId = v; return this; }
            public Builder quizTitle(String v) { r.quizTitle = v; return this; }
            public Builder totalQuestions(Integer v) { r.totalQuestions = v; return this; }
            public Builder correctAnswers(Integer v) { r.correctAnswers = v; return this; }
            public Builder wrongAnswers(Integer v) { r.wrongAnswers = v; return this; }
            public Builder skippedAnswers(Integer v) { r.skippedAnswers = v; return this; }
            public Builder score(Integer v) { r.score = v; return this; }
            public Builder submittedAt(LocalDateTime v) { r.submittedAt = v; return this; }
            public Builder questionResults(List<QuestionResult> v) { r.questionResults = v; return this; }
            public AttemptResult build() { return r; }
        }
    }

    public static class QuestionResult {
        private Long questionId, selectedOptionId, correctOptionId;
        private String questionText;
        private Boolean isCorrect, isSkipped;

        public Long getQuestionId() { return questionId; }
        public String getQuestionText() { return questionText; }
        public Long getSelectedOptionId() { return selectedOptionId; }
        public Long getCorrectOptionId() { return correctOptionId; }
        public Boolean getIsCorrect() { return isCorrect; }
        public Boolean getIsSkipped() { return isSkipped; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final QuestionResult r = new QuestionResult();
            public Builder questionId(Long v) { r.questionId = v; return this; }
            public Builder questionText(String v) { r.questionText = v; return this; }
            public Builder selectedOptionId(Long v) { r.selectedOptionId = v; return this; }
            public Builder correctOptionId(Long v) { r.correctOptionId = v; return this; }
            public Builder isCorrect(Boolean v) { r.isCorrect = v; return this; }
            public Builder isSkipped(Boolean v) { r.isSkipped = v; return this; }
            public QuestionResult build() { return r; }
        }
    }
}
