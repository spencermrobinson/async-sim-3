import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticated, logout } from '../../ducks/reducer.js';
import auth from '../../utilities/Auth.js';
import User from './User/User.js';
import Header from '../Header/Header.js'


class Dashboard extends Component{
    constructor(props){
        super(props);

    }
    componentWillMount(){
        const{ user, history, authenticated, logout} = this.props;
        auth(authenticated, user, history, null, null, null);
    }

    render(){
        const { user, logout }= this.props;
        console.log(user, 'user')
        return(
            <div>
                <div>
                    <Header page="Dashboard" logout={ logout }/>
                </div> 
                <div>
                <User user={ user }/>
                </div> 
            </div> 
        )
    }
}

function mapStateToProps(state){
   return{ user: state.user
    }
}
export default connect( mapStateToProps, { authenticated, logout })(Dashboard);