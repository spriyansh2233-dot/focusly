package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.model.Flashcard;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.FlashcardRepository;
import com.learning.ai_learning_copilot.repository.ConceptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FlashcardService {

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private ConceptRepository conceptRepository;

    @Autowired
    private GeminiService geminiService;

    public List<Flashcard> getFlashcards(UUID userId, UUID conceptId) {
        List<Flashcard> existing = flashcardRepository.findByUserIdAndConceptId(userId, conceptId);
        if (existing.isEmpty() && conceptId != null) {
            return generateFlashcards(userId, conceptId);
        }
        return existing;
    }

    public List<Flashcard> generateFlashcards(UUID userId, UUID conceptId) {
        Concept concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new RuntimeException("Concept not found"));

        String prompt = String.format(
            "Generate 5 high-quality flashcards for the concept: '%s'. " +
            "Include definitions, key formulas, or memory tricks. " +
            "Return ONLY a JSON array. Each object should have: " +
            "'front' (string), 'back' (string), 'category' (string).",
            concept.getTitle()
        );

        List<Map<String, Object>> aiCards = geminiService.generateJSONContent(prompt);

        User user = concept.getLearningPath().getUser();

        return aiCards.stream().map(data -> {
            Flashcard f = new Flashcard();
            f.setUser(user);
            f.setConcept(concept);
            f.setFront((String) data.get("front"));
            f.setBack((String) data.get("back"));
            f.setCategory((String) data.get("category"));
            f.setConfidenceLevel(0);
            return flashcardRepository.save(f);
        }).toList();
    }

    public Flashcard updateConfidence(UUID cardId, int level) {
        Flashcard card = flashcardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Flashcard not found"));
        card.setConfidenceLevel(level);
        card.setLastReviewedAt(LocalDateTime.now());
        return flashcardRepository.save(card);
    }
}
