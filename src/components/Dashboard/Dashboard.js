import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticated, logout, getRecommended, addRecommended } from '../../ducks/reducer.js';
import auth from '../../utilities/Auth.js';
import User from './User/User.js';
import Header from '../Header/Header.js';
import Recommended from './Recommended/Recommended.js';
import './Dashboard.css';


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            filter: 'firstname'
        }
        this.updateFilter = this.updateFilter.bind(this);
    }
    componentDidMount(){
        const{ user, history, authenticated} = this.props;
        auth(authenticated, user, history, null, null, null);

        this.props.getRecommended( this.state.filter);
        
    }

    updateFilter( filter ){
        this.setState({ filter });
        const { getRecommended }= this.props;
        getRecommended( filter );
    }
    
   

    render(){
        const { user, logout, addRecommended }= this.props;
        const { filter } = this.state;
        
       
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
                <div className="recommended_parent">
                    <div className="recommended_child">
                        <div className="recommended_header">
                            <span className='recommended_header_text'>Recommended Friends</span>
                            <div className="filter_container">
                            <span className='recommended_header_text'>Sort By:</span>
                            <select className="filter_select" value={ filter } onChange ={ (e) => this.updateFilter( e.target.value ) }>
                            <option value='firstname'>First Name</option>
                            <option value='laststname'>Last Name</option>
                            <option value='gender'>Gender</option>
                            <option value='hobby'>Hobby</option>
                            <option value='hair'>Hair Color</option>
                            <option value='eye'>Eye Color</option>
                            <option value='birthday'>Birthday</option>
                            </select>
                            </div>  
                        </div>
                        
                        <div className="recommended_user">
                        {this.props.recommended !== null 
                        ?
                          <div className="recommended_users_child">
                          {
                              this.props.recommended.map( user => (
                                <Recommended key={ user.id }  recommended_friend={ user } filter={ this.state.filter } addRecommended={ addRecommended } />
                              ))
                          }
                          </div>
                        :
                          <div className="Dashboard__recommended_users_child_empty">
                            <span className="open-sans"> No recommendations </span>
                          </div>
                      }
                        </div>
                          
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
export default connect( mapStateToProps, { authenticated, logout, getRecommended, addRecommended })(Dashboard);