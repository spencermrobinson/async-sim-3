import React from 'react';
import { Link } from 'react-router-dom';

export default function Pages({ page, current }){
    switch(current){
        case true:
        return(
            <Link to={`/search/${page}`}>
                <div>
                    <span className=''>Page {page}</span>
                </div>
            </Link> 
        )
        case false:
        return(
            <Link to={`/search/${page}`}>
                <div>
                    <span className=''>Page {page}</span>
                </div>
            </Link> 
        )
        default: 
        return null;
    }
}