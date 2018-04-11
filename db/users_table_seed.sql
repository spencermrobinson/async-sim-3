CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    picture TEXT
);