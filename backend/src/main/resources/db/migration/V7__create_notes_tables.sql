CREATE TABLE notes (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    file_name VARCHAR(500),
    file_type VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE note_summaries (
    id UUID PRIMARY KEY,
    note_id UUID NOT NULL,
    summary TEXT,
    bullet_points TEXT,
    keywords VARCHAR(1000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
);
