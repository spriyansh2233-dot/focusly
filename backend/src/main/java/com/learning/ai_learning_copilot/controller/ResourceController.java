package com.learning.ai_learning_copilot.controller;

import com.learning.ai_learning_copilot.model.LearningResource;
import com.learning.ai_learning_copilot.repository.LearningResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    private LearningResourceRepository learningResourceRepository;

    @GetMapping
    public ResponseEntity<List<LearningResource>> getAllResources() {
        return ResponseEntity.ok(learningResourceRepository.findAll());
    }
}
