package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.TutorConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface TutorConversationRepository extends JpaRepository<TutorConversation, UUID> {
    List<TutorConversation> findByUserId(UUID userId);
}
