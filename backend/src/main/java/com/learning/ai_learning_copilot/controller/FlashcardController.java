package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.Flashcard;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.service.FlashcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    @Autowired
    private FlashcardService flashcardService;

    @GetMapping
    public ResponseEntity<?> getFlashcards(@AuthenticationPrincipal User user, @RequestParam(required = false) UUID conceptId) {
        if (user == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(flashcardService.getFlashcards(user.getId(), conceptId));
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generate(@AuthenticationPrincipal User user, @RequestBody Map<String, String> payload) {
        if (user == null) return ResponseEntity.status(401).build();
        UUID conceptId = UUID.fromString(payload.get("conceptId"));
        return ResponseEntity.ok(flashcardService.generateFlashcards(user.getId(), conceptId));
    }

    @PutMapping("/{id}/confidence")
    public ResponseEntity<?> updateConfidence(@PathVariable UUID id, @RequestBody Map<String, Integer> payload) {
        return ResponseEntity.ok(flashcardService.updateConfidence(id, payload.get("level")));
    }
}
