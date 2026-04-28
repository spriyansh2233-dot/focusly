package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.service.LearningPathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        return ResponseEntity.ok(pathService.getUserPaths(user.getId()));
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generatePath(@AuthenticationPrincipal User user, @RequestBody Map<String, String> payload) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(pathService.generatePath(user, payload.get("goal")));
    }
}
