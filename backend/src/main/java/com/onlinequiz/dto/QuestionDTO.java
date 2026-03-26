package com.onlinequiz.dto;

import java.util.List;

public class QuestionDTO {

    public static class QuestionDetail {
        private Long id;
        private String questionText;
        private List<OptionDTO> options;

        public Long getId() { return id; }
        public String getQuestionText() { return questionText; }
        public List<OptionDTO> getOptions() { return options; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final QuestionDetail r = new QuestionDetail();
            public Builder id(Long v) { r.id = v; return this; }
            public Builder questionText(String v) { r.questionText = v; return this; }
            public Builder options(List<OptionDTO> v) { r.options = v; return this; }
            public QuestionDetail build() { return r; }
        }
    }

    public static class CreateQuestionRequest {
        private String questionText;
        private List<CreateOptionRequest> options;
        public String getQuestionText() { return questionText; }
        public List<CreateOptionRequest> getOptions() { return options; }
        public void setQuestionText(String v) { this.questionText = v; }
        public void setOptions(List<CreateOptionRequest> v) { this.options = v; }
    }

    public static class CreateOptionRequest {
        private String optionText;
        private Boolean isCorrect;
        public String getOptionText() { return optionText; }
        public Boolean getIsCorrect() { return isCorrect; }
        public void setOptionText(String v) { this.optionText = v; }
        public void setIsCorrect(Boolean v) { this.isCorrect = v; }
    }

    public static class OptionDTO {
        private Long id;
        private String optionText;
        private Boolean isCorrect;

        public Long getId() { return id; }
        public String getOptionText() { return optionText; }
        public Boolean getIsCorrect() { return isCorrect; }

        public static Builder builder() { return new Builder(); }
        public static class Builder {
            private final OptionDTO r = new OptionDTO();
            public Builder id(Long v) { r.id = v; return this; }
            public Builder optionText(String v) { r.optionText = v; return this; }
            public Builder isCorrect(Boolean v) { r.isCorrect = v; return this; }
            public OptionDTO build() { return r; }
        }
    }
}
