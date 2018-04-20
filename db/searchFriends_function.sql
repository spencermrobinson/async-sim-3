CREATE OR REPLACE FUNCTION searchFriends(id1 INTEGER, col1 character varying, request1 character varying, pg integer )
RETURNS SETOF users AS 
$$
SELECT * FROM friends
RIGHT JOIN users
ON friends.friend_id = users.id
WHERE id != id1
AND
CASE WHEN col1 = 'firstname' THEN firstname ~* request1 
WHEN col1 = 'lastname' THEN lastname ~* request1 END
OFFSET ( pg * 4) - 4
LIMIT 4
	  

$$
LANGUAGE sql; 
