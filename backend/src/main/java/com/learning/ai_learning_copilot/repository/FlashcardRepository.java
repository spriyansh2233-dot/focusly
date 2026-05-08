package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, UUID> {
    List<Flashcard> findByUserId(UUID userId);
    List<Flashcard> findByUserIdAndConceptId(UUID userId, UUID conceptId);
}
