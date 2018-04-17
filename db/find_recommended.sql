SELECT * FROM users
LEFT JOIN friends
ON users.id = friends.user_id
WHERE friend_id IS NULL;