package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.model.RevisionSchedule;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.RevisionScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SpacedRepetitionService {

    @Autowired
    private RevisionScheduleRepository repository;

    public List<RevisionSchedule> getDueRevisions(UUID userId) {
        return repository.findByUserIdAndNextReviewAtBeforeOrderByReviewPriorityAscNextReviewAtAsc(userId, LocalDateTime.now());
    }

    public RevisionSchedule updateSchedule(User user, Concept concept, String answerQuality) {
        RevisionSchedule schedule = repository.findByUserIdAndConceptId(user.getId(), concept.getId())
            .orElseGet(() -> {
                RevisionSchedule newSchedule = new RevisionSchedule();
                newSchedule.setUser(user);
                newSchedule.setConcept(concept);
                return newSchedule;
            });

        schedule.setLastReviewedAt(LocalDateTime.now());
        
        int daysToAdd = 1;
        String priority = "HIGH";

        switch (answerQuality.toUpperCase()) {
            case "WRONG":
                daysToAdd = 1;
                priority = "HIGH";
                schedule.setMasteryScore(Math.max(0, schedule.getMasteryScore() - 10));
                break;
            case "MEDIUM":
                daysToAdd = 3;
                priority = "MEDIUM";
                schedule.setMasteryScore(Math.min(100, schedule.getMasteryScore() + 5));
                break;
            case "GOOD":
                daysToAdd = 7;
                priority = "LOW";
                schedule.setMasteryScore(Math.min(100, schedule.getMasteryScore() + 15));
                break;
            case "EXCELLENT":
                daysToAdd = 14;
                priority = "LOW";
                schedule.setMasteryScore(Math.min(100, schedule.getMasteryScore() + 25));
                break;
            default:
                daysToAdd = 1;
                priority = "HIGH";
        }

        schedule.setNextReviewAt(LocalDateTime.now().plusDays(daysToAdd));
        schedule.setReviewPriority(priority);

        return repository.save(schedule);
    }
}
