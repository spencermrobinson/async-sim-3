CREATE TABLE IF NOT EXISTS friends(
table_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
friend_id INTEGER REFERENCES users(id)
);