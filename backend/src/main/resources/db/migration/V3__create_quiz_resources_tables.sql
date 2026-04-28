CREATE TABLE quiz_questions (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    concept_id UUID REFERENCES concepts(id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(50),
    options JSON,
    correct_answer TEXT NOT NULL,
    difficulty DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_attempts (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES quiz_questions(id),
    user_answer TEXT,
    is_correct BOOLEAN,
    time_spent_seconds INT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_resources (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    concept_id UUID REFERENCES concepts(id),
    title VARCHAR(500) NOT NULL,
    url TEXT NOT NULL,
    resource_type VARCHAR(50),
    source VARCHAR(100),
    difficulty_level DOUBLE,
    estimated_duration_minutes INT,
    quality_rating DOUBLE,
    summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE study_sessions (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    concept_id UUID REFERENCES concepts(id),
    session_type VARCHAR(50),
    duration_minutes INT,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    notes TEXT
);

CREATE TABLE tutor_conversations (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    concept_id UUID REFERENCES concepts(id),
    messages JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_next_review ON user_progress(next_review_at);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_concepts_subject ON concepts(subject);
