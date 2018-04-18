CREATE OR REPLACE FUNCTION getFilter(id1 INTEGER, col1 character varying )
RETURNS SETOF users AS 
$$
SELECT * FROM users
WHERE id NOT IN (SELECT friend_id FROM friends WHERE user_id = id1) AND id != id1
ORDER BY 
CASE WHEN col1 = 'gender' THEN gender END,
CASE WHEN col1 = 'firstname' THEN firstname END
$$
LANGUAGE sql; 
