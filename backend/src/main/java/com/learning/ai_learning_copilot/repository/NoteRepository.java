package com.learning.ai_learning_copilot.repository;

import com.learning.ai_learning_copilot.model.Note;
import com.learning.ai_learning_copilot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NoteRepository extends JpaRepository<Note, UUID> {
    List<Note> findByUserOrderByCreatedAtDesc(User user);
    List<Note> findByUserAndTitleContainingIgnoreCase(User user, String title);
}
