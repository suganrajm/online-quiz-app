package com.onlinequiz.service.impl;

import com.onlinequiz.dto.AdminDTO;
import com.onlinequiz.entity.QuizAttempt;
import com.onlinequiz.entity.User;
import com.onlinequiz.repository.QuizAttemptRepository;
import com.onlinequiz.repository.QuizRepository;
import com.onlinequiz.repository.UserRepository;
import com.onlinequiz.service.AdminService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public AdminServiceImpl(UserRepository userRepository, QuizRepository quizRepository, QuizAttemptRepository quizAttemptRepository) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @Override
    public List<AdminDTO.UserProfile> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> new AdminDTO.UserProfile(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getRole().name(),
                        u.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        // Find user, if not exists it throws or we ignore. Let's find first.
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Delete all attempts by this user to avoid FK constraint violations
        List<QuizAttempt> attempts = quizAttemptRepository.findByUserId(userId);
        quizAttemptRepository.deleteAll(attempts);

        // Delete the user
        userRepository.delete(user);
    }

    @Override
    public List<AdminDTO.AttemptDetails> getAllAttempts() {
        return quizAttemptRepository.findAll().stream()
                .map(a -> new AdminDTO.AttemptDetails(
                        a.getId(),
                        a.getUser().getUsername(),
                        a.getQuiz().getTitle(),
                        a.getCorrectAnswers(),
                        a.getTotalQuestions(),
                        a.getSubmittedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public AdminDTO.DashboardStats getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalQuizzes = quizRepository.count();
        long totalAttempts = quizAttemptRepository.count();
        return new AdminDTO.DashboardStats(totalUsers, totalQuizzes, totalAttempts);
    }
}
