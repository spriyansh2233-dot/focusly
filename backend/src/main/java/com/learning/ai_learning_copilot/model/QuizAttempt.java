package com.learning.ai_learning_copilot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "quiz_attempts")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private QuizQuestion question;

    @Column(name = "user_answer")
    private String userAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "time_spent_seconds")
    private Integer timeSpentSeconds;

    @CreatedDate
    @Column(name = "attempted_at", updatable = false)
    private LocalDateTime attemptedAt;
}
