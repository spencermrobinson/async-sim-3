CREATE OR REPLACE FUNCTION searchFriends(id1 INTEGER, col1 character varying, request1 character varying, pg INTEGER )
RETURNS TABLE(id integer, firstname character varying, lastname character varying, picture text, friend_id integer) AS
$$
SELECT u.id, u.firstname, u.lastname, u.picture, f.friend_id FROM friends f
RIGHT JOIN users u
ON f.friend_id = u.id
WHERE u.id != id1
AND
CASE WHEN col1 = 'firstname' THEN u.firstname ~* request1
WHEN col1 = 'lastname' THEN u.lastname ~* request1 END
OFFSET ( pg * 4) - 4
LIMIT 4


$$
LANGUAGE sql;  

