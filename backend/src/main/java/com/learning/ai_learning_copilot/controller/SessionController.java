package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.service.MoodStudyEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    @Autowired
    private MoodStudyEngineService moodStudyEngineService;

    @PostMapping("/mood")
    public ResponseEntity<Map<String, Object>> getAdaptivePlan(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> payload) {
        
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        String mood = payload.get("mood");
        if (mood == null || mood.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(moodStudyEngineService.generateAdaptivePlan(user, mood));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getMoodHistory(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(moodStudyEngineService.getUserMoodHistory(user.getId()));
    }
}
