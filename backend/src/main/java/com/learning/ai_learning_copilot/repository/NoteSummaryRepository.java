package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.NoteSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NoteSummaryRepository extends JpaRepository<NoteSummary, UUID> {
}
