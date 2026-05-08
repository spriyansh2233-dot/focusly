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
                newProfile.setAvgFocusMinutes(50); // Focus score 50
                newProfile.setWeakTopics("[]");
                newProfile.setStrongestTopics("[]");
                newProfile.setQuizAccuracy(0.0);
                newProfile.setConsistencyScore(0);
                return newProfile;
            });

        // Initial setup for consistency if it's the first time
        if (profile.getUpdatedAt() == null) {
            profile.setQuizAccuracy(0.0);
            profile.setConsistencyScore(0);
        } else {
            // Recalculation logic for subsequent updates
            profile.setQuizAccuracy(Math.min(100.0, profile.getQuizAccuracy() + 1.0));
            profile.setConsistencyScore(Math.min(100, profile.getConsistencyScore() + 2));
        }
        
        profile.setUpdatedAt(LocalDateTime.now());
        return repository.save(profile);
    }
}
