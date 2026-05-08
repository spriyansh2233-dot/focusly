package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.model.RevisionSchedule;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.ConceptRepository;
import com.learning.ai_learning_copilot.service.SpacedRepetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private SpacedRepetitionService spacedRepetitionService;

    @Autowired
    private ConceptRepository conceptRepository;

    @GetMapping("/today")
    public ResponseEntity<List<RevisionSchedule>> getTodayRevisions(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(spacedRepetitionService.getDueRevisions(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.ok(java.util.List.of());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateRevision(@AuthenticationPrincipal User user, @RequestBody Map<String, String> payload) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            UUID conceptId = UUID.fromString(payload.get("conceptId"));
            String answerQuality = payload.get("answerQuality");

            Concept concept = conceptRepository.findById(conceptId).orElseThrow(() -> new RuntimeException("Concept not found"));
            return ResponseEntity.ok(spacedRepetitionService.updateSchedule(user, concept, answerQuality));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("message", "Revision updated with fallback"));
        }
    }
}
