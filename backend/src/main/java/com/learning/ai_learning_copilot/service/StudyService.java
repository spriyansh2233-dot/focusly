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

        String rawResponse = geminiService.generateContent(prompt);
        try {
            String cleanJson = rawResponse.replaceAll("```json", "").replaceAll("```", "").trim();
            Map<String, Object> data = new com.fasterxml.jackson.databind.ObjectMapper().readValue(cleanJson, Map.class);
            
            concept.setDescription((String) data.get("description"));
            // We could store keyPoints as a JSON string in a new field, or just return them.
            // For now, let's just save the description and return the whole object.
            return conceptRepository.save(concept);
        } catch (Exception e) {
            concept.setDescription("AI failed to generate content. Please try again later.");
            return concept;
        }
    }
}
