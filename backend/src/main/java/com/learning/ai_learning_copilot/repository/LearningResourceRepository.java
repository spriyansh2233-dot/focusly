package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.LearningResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface LearningResourceRepository extends JpaRepository<LearningResource, UUID> {
    List<LearningResource> findByConceptId(UUID conceptId);
}
