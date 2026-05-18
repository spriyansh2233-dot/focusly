package com.learning.ai_learning_copilot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "note_summaries")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class NoteSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id", nullable = false)
    @JsonIgnore
    private Note note;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "bullet_points", columnDefinition = "TEXT")
    private String bulletPoints;

    @Column(length = 1000)
    private String keywords;

    @Column(columnDefinition = "TEXT")
    private String formulas;

    @Column(name = "interview_points", columnDefinition = "TEXT")
    private String interviewPoints;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
