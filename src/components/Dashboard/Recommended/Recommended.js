import React, { Component } from 'react';

class Recommended extends Component {
    render(){
        return(
            <div className="recommended_parent">
                <img src={ recommended_friend.picture } alt="friend"/>
                <div className="recommended_name_container">
                    <span className="recommended_firstname">{ recommended_friend.firstname }</span>
                    <br/>
                    <span className="recommended_lastname">{ recommended_friend.lastname }</span>
                </div> 
            </div> 
        )
    }
}
export default Recommended;