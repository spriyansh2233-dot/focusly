package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.service.AITutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tutor")
public class TutorController {

    @Autowired
    private AITutorService aiTutorService;

    @PostMapping("/ask")
    public ResponseEntity<?> ask(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");
        if (prompt == null || prompt.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Prompt is required"));
        }
        String response = aiTutorService.generateResponse(
            "You are Focusly, a friendly AI learning companion. Answer the following question clearly and concisely for a student: " + prompt
        );
        return ResponseEntity.ok(Map.of("response", response));
    }
}
