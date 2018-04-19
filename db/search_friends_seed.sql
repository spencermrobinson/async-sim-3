select * from friends
right join users
on friends.friend_id = users.id
where ($2) ~* ($3) and id != ($1);