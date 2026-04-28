package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.RevisionSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface RevisionScheduleRepository extends JpaRepository<RevisionSchedule, UUID> {
    List<RevisionSchedule> findByUserIdAndNextReviewAtBeforeOrderByReviewPriorityAscNextReviewAtAsc(UUID userId, LocalDateTime date);
    Optional<RevisionSchedule> findByUserIdAndConceptId(UUID userId, UUID conceptId);
}
