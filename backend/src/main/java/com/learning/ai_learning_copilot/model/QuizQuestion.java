package com.learning.ai_learning_copilot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "quiz_questions")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "concept_id")
    private Concept concept;

    @Column(name = "question_text", nullable = false)
    private String questionText;

    @Column(name = "question_type")
    private String questionType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private String options;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    private Double difficulty;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
