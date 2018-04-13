import React from 'react';
import home from '../assets/home.png';
import search from '../assets/search.png';
import './Header.css';

export default function Header({page, logout}){
    return(
        <div className='header_container'>
            <div className='helo_container'>
                <span className='helo_header_text'>Helo</span>
                <img src={ home } alt='home' className="home"/>
                <img src= { search } alt="search" className="search"/>
            </div>
            <div className="page_container">
                <span className='page_text'>{ page }</span>
            </div>
            <div className="logout_container">
                <a href='http://localhost:5050/auth/logout' className="logout_text"><span  onClick={ ()=> logout()}>Logout</span></a>
            </div>   
        
        </div> 
    )
}