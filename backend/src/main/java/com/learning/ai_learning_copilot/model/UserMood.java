package com.learning.ai_learning_copilot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_moods")
@Data
@NoArgsConstructor
public class UserMood {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User user;

    @Column(nullable = false)
    private String mood;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public UserMood(User user, String mood) {
        this.user = user;
        this.mood = mood;
        this.createdAt = LocalDateTime.now();
    }
}
