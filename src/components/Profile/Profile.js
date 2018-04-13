import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, authenticated } from '../../ducks/reducer.js';
import Header from '../Header/Header.js';
import auth from '../../utilities/Auth.js';
import './Profile.css';

class Profile extends Component{
    constructor(props){
        super(props);

    }

    componentWillMount(){
        const{ user, history, authenticated} = this.props;
        auth(authenticated, user, history, null, null, null);
    }

    render(){
        const { user, logout } = this.props;
        return(
            <div className="dashboard">
                <div>
                    <Header page="Profile" logout={ logout }/>
                </div>
                <div className="profile_parent"> 
                <div className="profile_user_display">
                    <div className="profile_user">
                        <img src={user.picture} alt='picture' className="profile_picture"/>
                        <span className="profile_firstname">{user.firstname}</span>
                        <span className="profile_lastname">{user.lastname}</span>
                    </div>
                    <div className="profile_buttons_container">
                        <button type='' className='update_button'>Update</button>
                        <button type='' className='cancel_button'>Cancel</button>
                    </div>  
                </div>
                </div> 
            
            </div> 
        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect( mapStateToProps, { authenticated, logout })(Profile);