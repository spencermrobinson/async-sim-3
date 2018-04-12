require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const massive = require('massive');



const {
    SERVER_PORT,
    SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL, 
    CONNNECTION_STRING
}=process.env


const app = express();
app.use(bodyParser.json());

massive(CONNNECTION_STRING).then( db => {
    app.set('db', db);
})
.catch((err) => console.log(err));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    const picture = function(){ 
        return Math.floor((Math.random()+1) *1000)};
    const db = app.get('db');
   db.find_user([profile.user_id]).then(users => {
       if(!users[0]){
           db.create_user([profile.user_id, profile.name.givenName, profile.name.familyName, `https://robohash.org/${picture}`]).then(res => {
               done(null, userCreated[0].id);
           })
       }else{
           done(null, users[0].id)
       }
   })
}));

passport.serializeUser(function(profile, done){
    done(null, profile)
});
passport.deserializeUser(function(profile, done){
    done(null, profile)
});

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/#/dashboard'
}))






app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));