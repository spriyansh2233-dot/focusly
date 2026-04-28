package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.UserMood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserMoodRepository extends JpaRepository<UserMood, UUID> {
    List<UserMood> findByUserIdOrderByCreatedAtDesc(UUID userId);
}
