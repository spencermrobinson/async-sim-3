require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const massive = require('massive');



const {
    PORT,
    SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL, 
    CONNNECTION_STRING
}=process.env


const app = express();
app.use(bodyParser.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))






app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));