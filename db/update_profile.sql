UPDATE users
SET firstname = $1,
lastname = $2, 
gender = $3,
hair = $4,
eye = $5, 
hobby = $6, 
birthday = $7
WHERE id = $8;