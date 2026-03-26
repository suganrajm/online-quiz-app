package com.onlinequiz.service;

import com.onlinequiz.dto.AdminDTO;
import java.util.List;

public interface AdminService {
    List<AdminDTO.UserProfile> getAllUsers();
    void deleteUser(Long userId);
    List<AdminDTO.AttemptDetails> getAllAttempts();
    AdminDTO.DashboardStats getDashboardStats();
}
