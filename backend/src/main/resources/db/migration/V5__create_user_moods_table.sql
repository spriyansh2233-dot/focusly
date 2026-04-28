CREATE TABLE user_moods (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    mood VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_user_moods_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_moods_user_date ON user_moods(user_id, created_at);
