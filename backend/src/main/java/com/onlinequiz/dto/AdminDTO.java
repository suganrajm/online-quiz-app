package com.onlinequiz.dto;

import java.time.LocalDateTime;

public class AdminDTO {

    public static class UserProfile {
        private Long id;
        private String username;
        private String email;
        private String role;
        private LocalDateTime createdAt;

        public UserProfile(Long id, String username, String email, String role, LocalDateTime createdAt) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.role = role;
            this.createdAt = createdAt;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    public static class AttemptDetails {
        private Long attemptId;
        private String username;
        private String quizTitle;
        private Integer score;
        private Integer totalQuestions;
        private LocalDateTime submittedAt;

        public AttemptDetails(Long attemptId, String username, String quizTitle, Integer score, Integer totalQuestions, LocalDateTime submittedAt) {
            this.attemptId = attemptId;
            this.username = username;
            this.quizTitle = quizTitle;
            this.score = score;
            this.totalQuestions = totalQuestions;
            this.submittedAt = submittedAt;
        }

        public Long getAttemptId() { return attemptId; }
        public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getQuizTitle() { return quizTitle; }
        public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }
        public Integer getScore() { return score; }
        public void setScore(Integer score) { this.score = score; }
        public Integer getTotalQuestions() { return totalQuestions; }
        public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
        public LocalDateTime getSubmittedAt() { return submittedAt; }
        public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    }

    public static class DashboardStats {
        private long totalUsers;
        private long totalQuizzes;
        private long totalAttempts;

        public DashboardStats(long totalUsers, long totalQuizzes, long totalAttempts) {
            this.totalUsers = totalUsers;
            this.totalQuizzes = totalQuizzes;
            this.totalAttempts = totalAttempts;
        }

        public long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
        public long getTotalQuizzes() { return totalQuizzes; }
        public void setTotalQuizzes(long totalQuizzes) { this.totalQuizzes = totalQuizzes; }
        public long getTotalAttempts() { return totalAttempts; }
        public void setTotalAttempts(long totalAttempts) { this.totalAttempts = totalAttempts; }
    }
}
