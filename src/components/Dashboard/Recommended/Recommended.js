import React, { Component } from 'react';
import './Recommended.css';

class Recommended extends Component {
    render(){
        const { recommended_friend, filter, addRecommended } = this.props;
        return(
            <div className="recommended_parent_container">
                <img className="recommended_picture" src={ recommended_friend.picture } alt="friend"/>
                <div className="recommended_name_container">
                    <span className="recommended_firstname">{ recommended_friend.firstname }</span>
                    <br/>
                    <span className="recommended_lastname">{ recommended_friend.lastname }</span>
                </div> 
                <button type='' className='recommended_button' onClick={ () => addRecommended(filter, recommended_friend.id)}>Add Friend</button>
            </div> 
        )
    }
}
export default Recommended;