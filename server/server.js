require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middleware/checkForSession.js');

const {
    PORT,
    SECRET
}=process.env


const app = express();

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use( checkForSession );




app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));