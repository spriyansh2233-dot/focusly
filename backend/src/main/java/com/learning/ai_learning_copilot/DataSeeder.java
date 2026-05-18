package com.learning.ai_learning_copilot;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.model.LearningProfile;
import com.learning.ai_learning_copilot.model.RevisionSchedule;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.model.LearningStyle;
import com.learning.ai_learning_copilot.repository.ConceptRepository;
import com.learning.ai_learning_copilot.repository.LearningProfileRepository;
import com.learning.ai_learning_copilot.repository.RevisionScheduleRepository;
import com.learning.ai_learning_copilot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConceptRepository conceptRepository;

    @Autowired
    private RevisionScheduleRepository revisionScheduleRepository;

    @Autowired
    private LearningProfileRepository learningProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Dummy data seeding removed to enable dynamic personalization for all users.
        System.out.println("Database initialization completed without dummy data.");
    }
}
