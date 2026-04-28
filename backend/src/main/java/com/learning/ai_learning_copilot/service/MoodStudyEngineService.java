package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.model.UserMood;
import com.learning.ai_learning_copilot.repository.UserMoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class MoodStudyEngineService {

    @Autowired
    private UserMoodRepository userMoodRepository;

    public Map<String, Object> generateAdaptivePlan(User user, String mood) {
        // Persist mood
        userMoodRepository.save(new UserMood(user, mood));

        Map<String, Object> plan = new HashMap<>();
        plan.put("mood", mood);
        
        String action;
        String description;
        int durationMinutes;

        switch (mood.toLowerCase()) {
            case "tired":
                action = "Light Revision";
                description = "Review 5 flashcards and watch a short summary video.";
                durationMinutes = 15;
                break;
            case "focused":
                action = "Deep Learning";
                description = "Tackle your weakest topic with a comprehensive quiz and project task.";
                durationMinutes = 60;
                break;
            case "stressed":
                action = "Easy Wins";
                description = "Take a confidence-boosting quiz on your strongest topics.";
                durationMinutes = 20;
                break;
            case "motivated":
                action = "Challenge Mode";
                description = "Learn a brand new concept and take an advanced quiz.";
                durationMinutes = 45;
                break;
            case "low_energy":
            default:
                action = "Micro-learning";
                description = "Read one short concept summary. No quizzes today.";
                durationMinutes = 10;
                break;
        }

        plan.put("action", action);
        plan.put("description", description);
        plan.put("durationMinutes", durationMinutes);

        return plan;
    }

    public java.util.List<UserMood> getUserMoodHistory(java.util.UUID userId) {
        return userMoodRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
