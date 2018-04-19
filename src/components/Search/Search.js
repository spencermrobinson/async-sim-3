import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { connect } from 'react-redux';
import { logout } from '../../ducks/reducer.js';
import './Search.css';

class Search extends Component {
    constructor(){
        super();
        this.state={
            seachBy: 'firstname',
            input: '',
        }

    }

    render(){
        return(
            <div className="search_page_container">
                <div className="search_header">
                    <Header page="Search" logout={ logout }/>
                </div> 
            
            </div> 
        )
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect( mapStateToProps, { logout })(Search);