import React from 'react';

export default function User({logout, history, user}){
    return(
        <div>
            <div>
                <img className="user_picture" src={user ? user.picture: '#'} alt="user"/>
            </div>
            <div>
                <span className=''>{user ? user.firstname : null}</span>
                <span className=''>{user ? user.lastname : null}</span>
            </div>  
        </div> 
    )
}