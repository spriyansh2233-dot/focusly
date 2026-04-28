package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.LearningProfile;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.LearningProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class LearningProfileService {

    @Autowired
    private LearningProfileRepository repository;

    public LearningProfile getProfile(UUID userId) {
        return repository.findByUserId(userId).orElse(null);
    }

    public LearningProfile recalculateProfile(User user) {
        LearningProfile profile = repository.findByUserId(user.getId())
            .orElseGet(() -> {
                LearningProfile newProfile = new LearningProfile();
                newProfile.setUser(user);
                newProfile.setPreferredStyle(user.getLearningStyle() != null ? user.getLearningStyle().name() : "VISUAL");
                newProfile.setBestStudyTime("EVENING");
                newProfile.setAvgFocusMinutes(25);
                newProfile.setWeakTopics("[\"React Hooks\", \"Spring Security\"]");
                newProfile.setStrongestTopics("[\"Java Basics\", \"CSS Grid\"]");
                newProfile.setQuizAccuracy(0.0);
                newProfile.setConsistencyScore(0);
                return newProfile;
            });

        // Dummy recalculation logic for MVP
        profile.setQuizAccuracy(85.5);
        profile.setConsistencyScore(Math.min(100, profile.getConsistencyScore() + 5));
        profile.setUpdatedAt(LocalDateTime.now());

        return repository.save(profile);
    }
}
