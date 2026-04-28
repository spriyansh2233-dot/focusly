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
        LearningProfile profile = learningProfileService.getProfile(user.getId());
        if (profile == null) {
            profile = learningProfileService.recalculateProfile(user);
        }
        
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("focusSpanMinutes", profile.getAvgFocusMinutes() != null ? profile.getAvgFocusMinutes() : 25);
        response.put("consistencyScore", profile.getConsistencyScore() != null ? profile.getConsistencyScore() / 100.0 : 0.0);
        response.put("currentStreak", 3); // Dummy data for streak
        
        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        try {
            response.put("strengths", mapper.readValue(profile.getStrongestTopics(), java.util.List.class));
            response.put("weaknesses", mapper.readValue(profile.getWeakTopics(), java.util.List.class));
        } catch(Exception e) {
            response.put("strengths", java.util.List.of("Java Basics"));
            response.put("weaknesses", java.util.List.of("React Hooks"));
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/recalculate")
    public ResponseEntity<LearningProfile> recalculateProfile(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(learningProfileService.recalculateProfile(user));
    }
}
