import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { connect } from 'react-redux';
import { logout, searchAll, authenticated } from '../../ducks/reducer.js';
import './Search.css';
import auth from '../../utilities/Auth.js';
import Pages from './Pages/Pages.js';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            seachBy: 'firstname',
            input: '',
            count: this.props.searchArr,
            pages: []
        }

    }
    componentDidMount(){
        const{ user, history, authenticated} = this.props;
        auth(authenticated, user, history, null, null, null); 
        this.props.searchAll();
    }


    render(){
        console.log('searchArr:', this.props.searchArr)
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
        user: state.user,
        searchArr: state.searchArr
    }
}
export default connect( mapStateToProps, { logout, searchAll, authenticated })(Search);