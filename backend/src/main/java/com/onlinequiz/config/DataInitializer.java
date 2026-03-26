package com.onlinequiz.config;

import com.onlinequiz.entity.User;
import com.onlinequiz.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByUsername("Admin123")) {
            User admin = User.builder()
                    .username("Admin123")
                    .email("admin@onlinequiz.com")
                    .fullName("Administrator")
                    .password(passwordEncoder.encode("Admin@12345"))
                    .role(User.Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Admin user created: Admin123");
        } else {
            log.info("Admin user already exists");
        }
    }
}
