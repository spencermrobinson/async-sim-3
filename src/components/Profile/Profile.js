import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout, authenticated } from '../../ducks/reducer.js';
import Header from '../Header/Header.js';
import auth from '../../utilities/Auth.js';
import Drop from '../../utilities/Drop.js';
import './Profile.css';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state= {
            id: '',
            firstname: '',
            lastname: '',
            birthday: '',
            eye: '',
            hair: '',
            gender: '',
            hobby: '',
            b_month: '',
            b_day: '',
            b_year: '',
            showRequired: false
        };
    }

    componentWillMount(){
        const{ user, history, authenticated} = this.props;
        auth(authenticated, user, history, null, null, null);
        this.formatPropsToState(user);
    }
    formatPropsToState( user ) {
        if ( user !== null ) {
          for( var i in user ) {
            this.setState({ [i]: user[i] || "" });
          }
    
          if ( user.birthday ) {
            this.setState({ b_month: user.birthday.slice(5, 7) || "", 
                            b_day: user.birthday.slice(8, 10) || "", 
                            b_year: user.birthday.slice(0, 4) || ""
            });
          }
        }
      }
      componentWillReceiveProps( { user } ) {
        this.formatPropsToState( user );
      }

    render(){
        console.log(Drop.years, 'years')
        const { history, user, logout } = this.props;
        const months = Drop.months;
        const days = Drop.days;
        const  renderYears = Drop.years.map( year =>(
            <option key={ year} value={ year}>{ year }</option>
        ))
        const { showRequired } = this.state;
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
                <div className='profile_edit_container'>
                    <div className='profile_edit_child'>
                    <div className='profile_edit_left'>
                        <div className='profile_input_container'>
                            <span className='user_input_header'>First Name</span>
                            <input type='text' className='user_input' value= {this.state.firstname}/>
                        </div>
                        <div className='profile_input_container'>
                            <span className='user_input_header'>Last Name</span>
                            <input type='text' className='user_input' value= {this.state.lastname}/>
                        </div>
                        <div className='profile_input_container'>
                            <span className='user_input_header'>Gender</span>
                            <select className="user_select" value={ this.state.gender }>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Hair Color</span>
                        <select className="user_select" value={ this.state.hair }>
                            <option disabled value=''>--Select--</option>
                            <option value='Brown'>Brown</option>
                            <option value='Black'>Black</option>
                            <option value='Red'>Red</option>
                            <option value='Blonde'>Blonde</option>
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Eye Color</span>
                        <select className="user_select" value={ this.state.eye }>
                            <option disabled value=''>--Select--</option>
                            <option value='Brown'>Brown</option>
                            <option value='Hazel'>Hazel</option>
                            <option value='Blue'>Blue</option>
                            <option value='Green'>Green</option>
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Hobby</span>
                        <select className="user_select" value={ this.state.hobby }>
                            <option disabled value=''>--Select--</option>
                            <option value='Golfing'>Golfing</option>
                            <option value='Hiking'>Hiking</option>
                            <option value='Video Games'>Video Games</option>
                            <option value='Fishing'>Fishing</option>
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Birthday Day</span>
                        <select className="user_select" value={ this.state.b_day}>
                            <option disabled value=''>--Select--</option>
                            { days.map( day => (
                                <option key={ day } value={ day}>{ day }</option>
                            ))}
                        </select> 
                        </div> 
                        <div className="profile_input_container">
                        <span className='user_input_header'>Birthday Month</span>
                        <select className='user_select' value={ this.state.b_month }>
                            <option disabled value=''>--Select--</option>
                            { months.map ( month => (
                                <option key={month.value} value={ month.value }>{ month.label }</option>
                            ))}
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Birthday Year</span>
                        <select className="user_select" value={ this.state.b_year }>
                            <option disabled value=''>--Select--</option>
                            { renderYears }
                        </select> 
                        </div>        
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