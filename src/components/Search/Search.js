import React, { Component } from 'react';
import Header from '../Header/Header.js';
import { connect } from 'react-redux';
import { logout, searchAll, authenticated, searchFriends } from '../../ducks/reducer.js';
import './Search.css';
import auth from '../../utilities/Auth.js';
import Pages from './Pages/Pages.js';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            searchBy: 'firstname',
            input: null,
            count: this.props.searchArr,
            pages: [],
            
        }

    }
    componentDidMount(){
        const{ user, history, authenticated} = this.props;
        const page = this.props.match.params.page
        auth(authenticated, user, history, null, null, null); 
        this.props.searchFriends(this.state.searchBy, this.state.input, 2);
    }


    render(){
        console.log('searchArr:', this.props.searchArr)
        console.log('page', this.props.match.params.page)
        console.log('col:', this.state.searchBy)
        console.log('input:', this.state.input)
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
export default connect( mapStateToProps, { logout, searchAll, searchFriends, authenticated })(Search);