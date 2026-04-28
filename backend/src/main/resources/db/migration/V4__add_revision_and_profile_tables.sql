CREATE TABLE revision_schedule (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
    mastery_score DOUBLE DEFAULT 0.0,
    last_reviewed_at TIMESTAMP,
    next_review_at TIMESTAMP,
    review_priority VARCHAR(20) CHECK (review_priority IN ('HIGH', 'MEDIUM', 'LOW')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_profile (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    preferred_style VARCHAR(50),
    best_study_time VARCHAR(50),
    avg_focus_minutes INT DEFAULT 25,
    weak_topics JSON,
    strongest_topics JSON,
    quiz_accuracy DOUBLE DEFAULT 0.0,
    consistency_score INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_revision_schedule_user_next_review ON revision_schedule(user_id, next_review_at);
