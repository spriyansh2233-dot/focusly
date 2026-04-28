CREATE TABLE concepts (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    description TEXT,
    difficulty_level DOUBLE,
    prerequisites JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_paths (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal_description TEXT,
    pathway JSON NOT NULL,
    current_week INT DEFAULT 1,
    target_completion_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
    mastery_level VARCHAR(20) CHECK (mastery_level IN ('learning', 'reviewing', 'mastered')),
    last_reviewed_at TIMESTAMP,
    next_review_at TIMESTAMP,
    review_count INT DEFAULT 0,
    ease_factor DOUBLE DEFAULT 2.5,
    interval_days INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, concept_id)
);
