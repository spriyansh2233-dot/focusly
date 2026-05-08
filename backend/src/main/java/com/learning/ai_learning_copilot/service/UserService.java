package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.model.LearningStyle;
import com.learning.ai_learning_copilot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LearningProfileService learningProfileService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setLearningStyle(LearningStyle.VISUAL);
        
        User savedUser = userRepository.save(user);
        
        // Seed Learning Profile
        learningProfileService.recalculateProfile(savedUser);
        
        return savedUser;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
