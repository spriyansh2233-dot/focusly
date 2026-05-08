package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.LearningProfile;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.service.LearningProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private LearningProfileService learningProfileService;

    @GetMapping("/dna")
    public ResponseEntity<java.util.Map<String, Object>> getProfileDna(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            LearningProfile profile = learningProfileService.getProfile(user.getId());
            if (profile == null) {
                profile = learningProfileService.recalculateProfile(user);
            }
            
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("focusSpanMinutes", profile.getAvgFocusMinutes() != null ? profile.getAvgFocusMinutes() : 50);
            response.put("consistencyScore", profile.getConsistencyScore() != null ? profile.getConsistencyScore() / 100.0 : 0.0);
            response.put("currentStreak", 0);
            response.put("quizzesCompleted", 0);
            response.put("weeklyProgress", 0);
            response.put("learningStyle", profile.getPreferredStyle() != null ? profile.getPreferredStyle() : "VISUAL");
            
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            try {
                response.put("strengths", mapper.readValue(profile.getStrongestTopics(), java.util.List.class));
                response.put("weaknesses", mapper.readValue(profile.getWeakTopics(), java.util.List.class));
            } catch(Exception e) {
                response.put("strengths", java.util.List.of("Java Basics"));
                response.put("weaknesses", java.util.List.of("React Hooks"));
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            java.util.Map<String, Object> fallback = new java.util.HashMap<>();
            fallback.put("focusSpanMinutes", 25);
            fallback.put("consistencyScore", 0.0);
            fallback.put("currentStreak", 0);
            fallback.put("strengths", java.util.List.of("Focusing"));
            fallback.put("weaknesses", java.util.List.of("Starting out"));
            return ResponseEntity.ok(fallback);
        }
    }

    @PostMapping("/recalculate")
    public ResponseEntity<LearningProfile> recalculateProfile(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(learningProfileService.recalculateProfile(user));
    }
}
