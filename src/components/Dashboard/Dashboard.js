import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticated, logout, getRecommended } from '../../ducks/reducer.js';
import auth from '../../utilities/Auth.js';
import User from './User/User.js';
import Header from '../Header/Header.js';
import './Dashboard.css';


class Dashboard extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        const{ user, history, authenticated} = this.props;
        auth(authenticated, user, history, null, null, null);
        this.props.getRecommended();
        
    }
   

    render(){
        const { user, logout }= this.props;
        console.log(user, 'user')
        console.log(this.props.recommended, "recommended")
        return(
            <div className='dashboard'>
                <div>
                    <Header page="Dashboard" logout={ logout }/>
                </div>
                <div className="displays"> 
                    <div className='user_display_container'>
                    
                        <User user={ user }/>
                    
                    </div>
                </div>  
            </div> 
        )
    }
}

function mapStateToProps(state){
   return{ user: state.user,
        recommended: state.recommended
    }
}
export default connect( mapStateToProps, { authenticated, logout, getRecommended })(Dashboard);