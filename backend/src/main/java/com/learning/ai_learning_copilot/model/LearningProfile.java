package com.learning.ai_learning_copilot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.LocalDateTime;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "learning_profile")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class LearningProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "preferred_style")
    private String preferredStyle;

    @Column(name = "best_study_time")
    private String bestStudyTime;

    @Column(name = "avg_focus_minutes")
    private Integer avgFocusMinutes = 25;

    @Column(name = "weak_topics", columnDefinition = "json")
    private String weakTopics;

    @Column(name = "strongest_topics", columnDefinition = "json")
    private String strongestTopics;

    @Column(name = "quiz_accuracy")
    private Double quizAccuracy = 0.0;

    @Column(name = "consistency_score")
    private Integer consistencyScore = 0;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
