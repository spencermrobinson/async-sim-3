import axios from 'axios';
const initialState = {
    user: null,
    recommended: null,
    searchArr: null
}

const AUTHENTICATED = "AUTHENTICATED";
const LOGOUT = "LOGOUT";
const UPDATE_USER = "UPDATE_USER";
const GET_RECOMMENDED = "GET_RECOMMENDED";
const ADD_RECOMMENDED = "ADD_RECOMMENDED";
const SEARCH_ALL = "SEARCH_ALL";
const SEARCH_FRIENDS = "SEARCH_FRIENDS";

export default ( state = initialState, action ) => {
    const { payload } = action;

    switch( action.type ){
        case LOGOUT + '_FULFILLED':
        return Object.assign( {}, state, { user: null });

        case AUTHENTICATED + '_FULFILLED':
        return Object.assign( {}, state, { user: payload.authenticated === false ? null: payload});

        default: return state;

        case UPDATE_USER + '_FULFILLED':
        return Object.assign( {}, state, { user: payload} );

        case GET_RECOMMENDED + '_FULFILLED':
        return Object.assign( {}, state, { recommended: payload})

        case ADD_RECOMMENDED + '_FULFILLED':
        return Object.assign( {}, state, { recommended: payload })

        case SEARCH_ALL + '_FULFILLED':
        return Object.assign({}, state, {searchArr: payload})

        case SEARCH_FRIENDS + '_FULFILLED':
        return Object.assign( {}, state, { searchArr: payload})
        
    }
};

export function searchAll(){
    console.log('search all hit')
    const promise = axios.get(`/api/searchAll`).then( response =>
        
        response.data
    )
    return {
        type: SEARCH_ALL,
        payload: promise
    }
}

export function searchFriends(col, input, page){
    const promise = axios.get(`/api/searchFriends/${col}/${input}/${page}`).then(response =>
        response.data
    )
    return {
        type: SEARCH_FRIENDS,
        payload: promise
    }
}

export function addRecommended( filter, id ){
    const promise = axios.post(`/api/newfriend/${filter}/${id}`).then( response => 
    response.data
    )
    return {
        type: ADD_RECOMMENDED,
        payload: promise
    }
}

export function getRecommended( filter){
    const promise = axios.get( `/api/recommended/${filter}`).then( response =>
        response.data
        
    )
    return {
        type: GET_RECOMMENDED,
        payload: promise
    }
}

export function logout(){

    return {
        type: LOGOUT,
        payload: null
    }
}

export function updateUser(obj){
    const promise = axios.put( `/api/update/${obj.id}`, obj).then(response => response.data);
    
    return {
        type: UPDATE_USER,
        payload: promise
    }
}

export function authenticated(history, currentPath, optionalSuccessRedirect ){
    const promise = axios.get(`/auth/authenticate`).then(response => {
        if(optionalSuccessRedirect){
            history.push( optionalSuccessRedirect);
        }
        return response.data;
    }).catch( err => {
        if( currentPath !== '/auth'){
            history.push('/auth');
        }
        return { authenticated: false};
    });
    return {
        type: AUTHENTICATED,
        payload: promise
    }
}