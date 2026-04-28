package com.learning.ai_learning_copilot.service;

import com.learning.ai_learning_copilot.model.Concept;
import com.learning.ai_learning_copilot.model.RevisionSchedule;
import com.learning.ai_learning_copilot.model.User;
import com.learning.ai_learning_copilot.repository.RevisionScheduleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SpacedRepetitionServiceTest {

    @InjectMocks
    private SpacedRepetitionService service;

    @Mock
    private RevisionScheduleRepository repository;

    private User user;
    private Concept concept;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("test@example.com");

        concept = new Concept();
        concept.setId(UUID.randomUUID());
        concept.setName("React Hooks");
    }

    @Test
    void updateSchedule_WRONG_answer_schedules_next_day() {
        when(repository.findByUserIdAndConceptId(any(), any())).thenReturn(Optional.empty());
        when(repository.save(any())).thenAnswer(i -> i.getArgument(0));

        service.updateSchedule(user, concept, "WRONG");

        verify(repository, times(1)).save(argThat((RevisionSchedule r) -> {
            LocalDateTime tomorrow = LocalDateTime.now().plusDays(1);
            return r.getNextReviewAt().toLocalDate().equals(tomorrow.toLocalDate());
        }));
    }

    @Test
    void updateSchedule_GOOD_answer_schedules_7_days() {
        when(repository.findByUserIdAndConceptId(any(), any())).thenReturn(Optional.empty());
        when(repository.save(any())).thenAnswer(i -> i.getArgument(0));

        service.updateSchedule(user, concept, "GOOD");

        verify(repository, times(1)).save(argThat((RevisionSchedule r) -> {
            LocalDateTime sevenDays = LocalDateTime.now().plusDays(7);
            return r.getNextReviewAt().toLocalDate().equals(sevenDays.toLocalDate());
        }));
    }

    @Test
    void updateSchedule_EXCELLENT_answer_schedules_14_days() {
        when(repository.findByUserIdAndConceptId(any(), any())).thenReturn(Optional.empty());
        when(repository.save(any())).thenAnswer(i -> i.getArgument(0));

        service.updateSchedule(user, concept, "EXCELLENT");

        verify(repository, times(1)).save(argThat((RevisionSchedule r) -> {
            LocalDateTime fourteenDays = LocalDateTime.now().plusDays(14);
            return r.getNextReviewAt().toLocalDate().equals(fourteenDays.toLocalDate());
        }));
    }

    @Test
    void updateSchedule_existing_schedule_updates_mastery_score() {
        RevisionSchedule existing = new RevisionSchedule();
        existing.setId(UUID.randomUUID());
        existing.setUser(user);
        existing.setConcept(concept);
        existing.setMasteryScore(0.5);
        existing.setNextReviewAt(LocalDateTime.now().plusDays(1));

        when(repository.findByUserIdAndConceptId(any(), any())).thenReturn(Optional.of(existing));
        when(repository.save(any())).thenAnswer(i -> i.getArgument(0));

        service.updateSchedule(user, concept, "GOOD");

        verify(repository).save(argThat((RevisionSchedule r) ->
            r.getMasteryScore() > 0.5 // score should improve on a GOOD answer
        ));
    }
}
