package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.repository.ConceptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class StudyService {

    @Autowired
    private ConceptRepository conceptRepository;

    @Autowired
    private GeminiService geminiService;

    public Concept getConceptDetails(UUID conceptId) {
        Concept concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new RuntimeException("Concept not found"));

        if (concept.getDescription() == null || concept.getDescription().isBlank()) {
            return generateConceptAI(concept);
        }
        return concept;
    }

    private Concept generateConceptAI(Concept concept) {
        String prompt = String.format(
            "Explain the concept: '%s' in the context of '%s'. " +
            "Provide a clear description and 5 key bullet points for learning. " +
            "Return ONLY a JSON object with 'description' (string) and 'keyPoints' (array of strings).",
            concept.getName(), concept.getSubject()
        );

        try {
            Map<String, Object> data = geminiService.generateJSONObjectContent(prompt);
            if (data != null && data.containsKey("description")) {
                concept.setDescription((String) data.get("description"));
            } else {
                concept.setDescription("Unable to generate description. Please try again.");
            }
            return conceptRepository.save(concept);
        } catch (Exception e) {
            concept.setDescription("AI failed to generate content. Please try again later.");
            return concept;
        }
    }
}
