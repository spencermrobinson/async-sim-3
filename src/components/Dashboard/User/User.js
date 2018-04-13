import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';

export default function User({logout, history, user}){
    return(
        <div className='display_user_container'>
            <div className='user_container'>
                <div className='image_container'>
                    <img className="user_picture" src={user ? user.picture: '#'} alt="user" className='user_picture'/>
                </div>
                <div className='user_info_container'>
                <span className='user_text'>{user ? user.firstname : null}</span>
                <br/>
                <span className='user_text'>{user ? user.lastname : null}</span>
                <br/>
                <Link to="/profile"><button type='' className='edit_button'>Edit Profile</button></Link>
                </div>  
            </div> 
            <div className="informative_container">
                <div className="informative_text">
                    <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                </div>    
            </div> 
        </div> 
    )
}