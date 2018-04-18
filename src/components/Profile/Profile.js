import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, authenticated, updateUser } from '../../ducks/reducer.js';
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
        
        };
        this.updateProfile = this.updateProfile.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateState = this.updateState.bind(this);
        this.formatPropsToState = this.formatPropsToState.bind(this);
    }

    componentDidMount(){
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

      updateProfile(){
          
          const { id, firstname, lastname, eye, hair, gender, hobby, birthday } = this.state;
        this.props.updateUser({ id, firstname, lastname, eye, hair, gender, hobby, birthday});
        this.props.history.push('/dashboard');
      }
      cancel(){
          const { user } = this.props;
          this.formatPropsToState( user );
      }

      updateState ( prop, val) {
          this.setState({ [prop]: val});
          if( prop === "b_month" || prop === "b_day" || prop === "b_year"){
              const {b_month , b_day, b_year } = this.state;
              let temp = { b_month, b_day, b_year};
              temp[ prop ] = val;

              this.setState({ birthday: [ temp.b_year, temp.b_month, temp.b_day].join('-')});
          }
      }

    render(){
        const {  user } = this.props;
        const months = Drop.months;
        const days = Drop.days;
        const  renderYears = Drop.years.map( year =>(
            <option key={ year} value={ year}>{ year }</option>
        ))
        
        return(
            <div className="profile">
                <div>
                    <Header page="Profile" logout={ logout }/>
                </div>
                <div className="profile_parent"> 
                <div className="profile_user_display">
                    <div className="profile_user">
                        <img src={user.picture} alt='' className="profile_picture"/>
                        <span className="profile_firstname">{user.firstname}</span>
                        <span className="profile_lastname">{user.lastname}</span>
                    </div>
                    <div className="profile_buttons_container">
                        <button type='' className='update_button' onClick={ this.updateProfile} >Update</button>
                        <Link to="/dashboard"><button type='' className='cancel_button' onClick={ this.cancel }>Cancel</button></Link>
                    </div>  
                </div>
                </div>
                <div className='profile_edit_container'>
                    <div className='profile_edit_child'>
                    <div className='profile_edit_left'>
                    <div className="profile_input_parent"> 
                        <div className='profile_input_container'>
                            <span className='user_input_header'>First Name</span>
                            <input type='text' className='user_input' value= {this.state.firstname} onChange={(e) => this.updateState('firstname', e.target.value)}/>
                        </div>
                        <div className='profile_input_container'>
                            <span className='user_input_header'>Last Name</span>
                            <input type='text' className='user_input' value= {this.state.lastname} onChange={(e) => this.updateState('lastname', e.target.value)}/>
                        </div>
                        <div className='profile_input_container'>
                            <span className='user_input_header'>Gender</span>
                            <select className="user_select" value={ this.state.gender } onChange={(e) => this.updateState('gender', e.target.value)}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Hair Color</span>
                        <select className="user_select" value={ this.state.hair } onChange={(e) => this.updateState('hair', e.target.value )}>
                            <option disabled value=''>--Select--</option>
                            <option value='Brown'>Brown</option>
                            <option value='Black'>Black</option>
                            <option value='Red'>Red</option>
                            <option value='Blonde'>Blonde</option>
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Eye Color</span>
                        <select className="user_select" value={ this.state.eye } onChange={(e) => this.updateState('eye', e.target.value)}>
                            <option disabled value=''>--Select--</option>
                            <option value='Brown'>Brown</option>
                            <option value='Hazel'>Hazel</option>
                            <option value='Blue'>Blue</option>
                            <option value='Green'>Green</option>
                        </select> 
                        </div>
                        </div>        
                    </div>
                    <div className="profile_edit_right">
                    <div className="profile_input_parent"> 
                    <div className="profile_input_container">
                        <span className="user_input_header">Hobby</span>
                        <select className="user_select" value={ this.state.hobby } onChange={(e) => this.updateState('hobby', e.target.value )}>
                            <option disabled value=''>--Select--</option>
                            <option value='Golfing'>Golfing</option>
                            <option value='Hiking'>Hiking</option>
                            <option value='Video Games'>Video Games</option>
                            <option value='Fishing'>Fishing</option>
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Birthday Day</span>
                        <select className="user_select" value={ this.state.b_day} onChange={(e) => this.updateState('b_day', e.target.value )}>
                            <option disabled value=''>--Select--</option>
                            { days.map( day => (
                                <option key={ day } value={ day}>{ day }</option>
                            ))}
                        </select> 
                        </div> 
                        <div className="profile_input_container">
                        <span className='user_input_header'>Birthday Month</span>
                        <select className='user_select' value={ this.state.b_month } onChange={(e) => this.updateState('b_month', e.target.value )}>
                            <option disabled value=''>--Select--</option>
                            { months.map ( month => (
                                <option key={month.value} value={ month.value }>{ month.label }</option>
                            ))}
                        </select> 
                        </div>
                        <div className="profile_input_container">
                        <span className="user_input_header">Birthday Year</span>
                        <select className="user_select" value={ this.state.b_year } onChange={(e) => this.updateState('b_year', e.target.value )}>
                            <option disabled value=''>--Select--</option>
                            { renderYears }
                        </select> 
                        </div>
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
export default connect( mapStateToProps, { authenticated, logout, updateUser })(Profile);