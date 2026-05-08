package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.service.StudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/study")
public class StudyController {

    @Autowired
    private StudyService studyService;

    @GetMapping("/concept/{id}")
    public ResponseEntity<Concept> getConcept(@PathVariable UUID id) {
        return ResponseEntity.ok(studyService.getConceptDetails(id));
    }
}
