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
    CONNECTION_STRING
}=process.env


const app = express();
app.use(bodyParser.json());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
    console.log('db connected')
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
    const picture = Math.floor((Math.random()+1) *1000);
    const db = app.get('db')
   db.find_user([profile.id]).then(users => {
       if(!users[0]){
           db.create_user([profile.id, profile.name.givenName, profile.name.familyName, `https://robohash.org/${picture}`]).then(users => {    
           done(null, users[0].id);  
           })
       }else{
           done(null, users[0].id)
       }
   })
}));

passport.serializeUser(function(profile, done){
    done(null, profile)
    console.log(profile, 'profile')
    
});
passport.deserializeUser( (profile, done) => {
    app.get('db').find_session_user([profile]).then( user => {
        done(null, user[0]);
        
    })
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/#/dashboard'
}));

app.get('/auth/authenticate', (req,res) => {
    if(req.user){
        res.status(200).send(req.user);
    }else{
        res.status(401).send('unauthorized user')
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/#/auth')
    console.log('logout hit on back end')
})






app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));