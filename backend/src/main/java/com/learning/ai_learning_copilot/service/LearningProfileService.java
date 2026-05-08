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

    @Autowired
    private com.learning.ai_learning_copilot.repository.QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private com.learning.ai_learning_copilot.repository.StudySessionRepository studySessionRepository;

    public LearningProfile getProfile(UUID userId) {
        return repository.findByUserId(userId).orElse(null);
    }

    public LearningProfile recalculateProfile(User user) {
        LearningProfile profile = repository.findByUserId(user.getId())
            .orElseGet(() -> {
                LearningProfile newProfile = new LearningProfile();
                newProfile.setUser(user);
                newProfile.setPreferredStyle("VISUAL");
                newProfile.setWeakTopics("[]");
                newProfile.setStrongestTopics("[]");
                return newProfile;
            });

        // Calculate Quiz Accuracy
        var attempts = quizAttemptRepository.findByUserId(user.getId());
        if (!attempts.isEmpty()) {
            long correctCount = attempts.stream().filter(com.learning.ai_learning_copilot.model.QuizAttempt::getIsCorrect).count();
            profile.setQuizAccuracy((double) correctCount / attempts.size() * 100);
        }

        // Calculate Consistency Score
        var sessions = studySessionRepository.findByUserId(user.getId());
        profile.setConsistencyScore(Math.min(100, sessions.size() * 5));

        // Calculate Focus Span
        if (!sessions.isEmpty()) {
            double avgTime = sessions.stream()
                .mapToInt(com.learning.ai_learning_copilot.model.StudySession::getDurationMinutes)
                .average()
                .orElse(25.0);
            profile.setAvgFocusMinutes((int) avgTime);
        }

        profile.setUpdatedAt(LocalDateTime.now());
        return repository.save(profile);
    }
}
