package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.LearningProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LearningProfileRepository extends JpaRepository<LearningProfile, UUID> {
    Optional<LearningProfile> findByUserId(UUID userId);
}
