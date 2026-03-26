package com.onlinequiz.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTO {

    public static class RegisterRequest {
        @NotBlank private String fullName;
        @NotBlank @Size(min = 3, max = 50) private String username;
        @NotBlank @Email private String email;
        @NotBlank @Size(min = 6) private String password;

        public String getFullName() { return fullName; }
        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public String getPassword() { return password; }
        public void setFullName(String v) { this.fullName = v; }
        public void setUsername(String v) { this.username = v; }
        public void setEmail(String v) { this.email = v; }
        public void setPassword(String v) { this.password = v; }
    }

    public static class LoginRequest {
        @NotBlank private String username;
        @NotBlank private String password;

        public String getUsername() { return username; }
        public String getPassword() { return password; }
        public void setUsername(String v) { this.username = v; }
        public void setPassword(String v) { this.password = v; }
    }

    public static class AuthResponse {
        private String token, username, fullName, role;
        private Long userId;

        public String getToken() { return token; }
        public String getUsername() { return username; }
        public String getFullName() { return fullName; }
        public String getRole() { return role; }
        public Long getUserId() { return userId; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private final AuthResponse r = new AuthResponse();
            public Builder token(String v) { r.token = v; return this; }
            public Builder username(String v) { r.username = v; return this; }
            public Builder fullName(String v) { r.fullName = v; return this; }
            public Builder role(String v) { r.role = v; return this; }
            public Builder userId(Long v) { r.userId = v; return this; }
            public AuthResponse build() { return r; }
        }
    }
}
