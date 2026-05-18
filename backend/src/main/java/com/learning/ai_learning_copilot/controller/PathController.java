package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/paths")
public class PathController {

    @Autowired
    private LearningPathService pathService;

    @GetMapping
    public ResponseEntity<?> getUserPaths(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(pathService.getUserPaths(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.ok(java.util.List.of()); // Fallback to empty list
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPath(@AuthenticationPrincipal User user, @PathVariable UUID id) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(pathService.getPath(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/concepts")
    public ResponseEntity<?> getPathConcepts(@AuthenticationPrincipal User user, @PathVariable UUID id) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(pathService.getPathConcepts(id));
        } catch (Exception e) {
            return ResponseEntity.ok(java.util.List.of());
        }
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generatePath(@AuthenticationPrincipal User user, @RequestBody Map<String, String> payload) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(pathService.generatePath(user, payload.get("goal")));
        } catch (Exception e) {
            com.learning.ai_learning_copilot.model.LearningPath fallback = new com.learning.ai_learning_copilot.model.LearningPath();
            fallback.setGoalDescription(payload.get("goal") != null ? payload.get("goal") : "New Path");
            fallback.setCurrentWeek(1);
            fallback.setPathway("[{\"week\": 1, \"topics\": [\"Introduction\"]}]");
            return ResponseEntity.ok(fallback);
        }
    }
}
