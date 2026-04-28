package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.Optional;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, UUID> {
    Optional<UserProgress> findByUserIdAndConceptId(UUID userId, UUID conceptId);
    List<UserProgress> findByUserId(UUID userId);
    List<UserProgress> findByUserIdAndNextReviewAtBefore(UUID userId, LocalDateTime date);
}
