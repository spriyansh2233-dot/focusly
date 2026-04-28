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
        if (userRepository.findByEmail("test@example.com").isEmpty()) {
            User user = new User();
            user.setUsername("testuser");
            user.setEmail("test@example.com");
            user.setPasswordHash(passwordEncoder.encode("password"));
            user.setLearningStyle(LearningStyle.VISUAL);
            user = userRepository.save(user);

            Concept c1 = new Concept();
            c1.setName("React Hooks");
            c1.setSubject("Frontend");
            c1.setDescription("Understanding useState and useEffect");
            c1.setDifficultyLevel(3.0);
            c1 = conceptRepository.save(c1);

            Concept c2 = new Concept();
            c2.setName("Spring Security");
            c2.setSubject("Backend");
            c2.setDescription("Configuring JWT Authentication");
            c2.setDifficultyLevel(4.5);
            c2 = conceptRepository.save(c2);

            RevisionSchedule rs1 = new RevisionSchedule();
            rs1.setUser(user);
            rs1.setConcept(c1);
            rs1.setMasteryScore(60.0);
            rs1.setLastReviewedAt(LocalDateTime.now().minusDays(2));
            rs1.setNextReviewAt(LocalDateTime.now().minusHours(2)); // Due now
            rs1.setReviewPriority("HIGH");
            revisionScheduleRepository.save(rs1);

            RevisionSchedule rs2 = new RevisionSchedule();
            rs2.setUser(user);
            rs2.setConcept(c2);
            rs2.setMasteryScore(85.0);
            rs2.setLastReviewedAt(LocalDateTime.now().minusDays(5));
            rs2.setNextReviewAt(LocalDateTime.now().minusDays(1)); // Overdue
            rs2.setReviewPriority("MEDIUM");
            revisionScheduleRepository.save(rs2);

            LearningProfile profile = new LearningProfile();
            profile.setUser(user);
            profile.setPreferredStyle("VISUAL");
            profile.setBestStudyTime("EVENING");
            profile.setAvgFocusMinutes(45);
            profile.setWeakTopics("[\"Spring Security\", \"PostgreSQL\"]");
            profile.setStrongestTopics("[\"React Hooks\", \"Tailwind CSS\"]");
            profile.setQuizAccuracy(82.5);
            profile.setConsistencyScore(88);
            learningProfileRepository.save(profile);

            System.out.println("Dummy Data Seeded Successfully!");
        }
    }
}
