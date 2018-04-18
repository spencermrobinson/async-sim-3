import React , { Component } from 'react';
import './Login.css';
import logo from '../assets/logo.png';

class Login extends Component{
    

    render(){
        return(
            <div className="login">
                <div className="login_container">
                    <div className="logo_container"><img src={logo} alt="logo" className="logo"/></div> 
                    
                    <p className="helo_text">Helo</p>
                    <a href={ process.env.REACT_APP_LOGIN }><button className="login_button">Login</button></a>
                </div> 
                
            </div> 
        )
    }
}
export default Login;