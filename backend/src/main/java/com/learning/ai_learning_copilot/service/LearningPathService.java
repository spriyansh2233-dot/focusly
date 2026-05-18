package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.LearningPath;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.LearningPathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class LearningPathService {

    @Autowired
    private LearningPathRepository repository;

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private com.learning.ai_learning_copilot.repository.ConceptRepository conceptRepository;

    @Autowired
    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    public List<LearningPath> getUserPaths(UUID userId) {
        return repository.findByUserId(userId);
    }

    public LearningPath getPath(UUID id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Learning path not found"));
    }

    public List<com.learning.ai_learning_copilot.model.Concept> getPathConcepts(UUID pathId) {
        return conceptRepository.findByLearningPathId(pathId);
    }

    public LearningPath generatePath(User user, String goal) {
        LearningPath path = new LearningPath();
        path.setUser(user);
        path.setGoalDescription(goal);
        path.setCurrentWeek(1);
        path.setTargetCompletionDate(LocalDate.now().plusWeeks(6));
        
        String prompt = String.format(
            "Generate a detailed 6-week learning roadmap for the topic: '%s'. " +
            "Return ONLY a JSON array where each object has 'week' (int), 'title' (string), and 'topics' (array of strings).",
            goal
        );
        
        List<Map<String, Object>> roadmap = geminiService.generateJSONContent(prompt);
        String cleanJson = "[]";
        try {
            cleanJson = objectMapper.writeValueAsString(roadmap);
        } catch (Exception e) {
            System.err.println("Failed to serialize roadmap: " + e.getMessage());
        }
        path.setPathway(cleanJson);
        
        LearningPath savedPath = repository.save(path);

        // Auto-create Concepts from the first few topics
        if (roadmap != null) {
            try {
                for (Map<String, Object> week : roadmap) {
                    List<String> topics = (List<String>) week.get("topics");
                    if (topics != null) {
                        for (String topicName : topics) {
                            com.learning.ai_learning_copilot.model.Concept concept = new com.learning.ai_learning_copilot.model.Concept();
                            concept.setName(topicName);
                            concept.setLearningPath(savedPath);
                            concept.setSubject(goal);
                            concept.setDifficultyLevel(0.5);
                            conceptRepository.save(concept);
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Failed to auto-create concepts: " + e.getMessage());
            }
        }
        
        return savedPath;
    }
}
