CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    picture TEXT,
    gender VARCHAR(20),
    hair VARCHAR(20),
    eye VARCHAR(20),
    hobby VARCHAR(20),
    birthday VARCHAR(20),
    

);