import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard.js';
import Login from './Login/Login.js';
import Profile from './Profile/Profile.js';



export default function Routes(){
    return( 
    <Switch>
        <Route exact path="/auth" component={ Login }/>
        <Route path="/dashboard" component={ Dashboard }/>
        <Route path="/profile" component={ Profile }/>
    
    </Switch>
    )
}