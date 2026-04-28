package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.Concept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConceptRepository extends JpaRepository<Concept, UUID> {
}
