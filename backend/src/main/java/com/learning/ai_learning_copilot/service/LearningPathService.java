package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.LearningPath;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.LearningPathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class LearningPathService {

    @Autowired
    private LearningPathRepository repository;

    public List<LearningPath> getUserPaths(UUID userId) {
        return repository.findByUserId(userId);
    }

    public LearningPath generatePath(User user, String goal) {
        LearningPath path = new LearningPath();
        path.setUser(user);
        path.setGoalDescription(goal);
        path.setCurrentWeek(1);
        path.setTargetCompletionDate(LocalDate.now().plusWeeks(4));
        
        // Dummy pathway JSON
        String dummyPathway = "[{\"week\": 1, \"topics\": [\"Introduction\", \"Basic Syntax\"]}, " +
                              "{\"week\": 2, \"topics\": [\"Core Concepts\", \"Advanced Features\"]}]";
        path.setPathway(dummyPathway);
        
        return repository.save(path);
    }
}
