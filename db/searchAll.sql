SELECT * FROM friends
RIGHT JOIN users
ON friends.friend_id = users.id
WHERE id != (1)