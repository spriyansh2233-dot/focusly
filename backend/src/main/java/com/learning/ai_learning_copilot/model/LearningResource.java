package com.learning.ai_learning_copilot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "learning_resources")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class LearningResource {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concept_id")
    private Concept concept;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(nullable = false)
    private String url;

    @Column(name = "resource_type")
    private String resourceType;

    private String source;

    @Column(name = "difficulty_level")
    private Double difficultyLevel;

    @Column(name = "estimated_duration_minutes")
    private Integer estimatedDurationMinutes;

    @Column(name = "quality_rating")
    private Double qualityRating;

    private String summary;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
