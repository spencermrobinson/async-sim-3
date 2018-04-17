import axios from 'axios';
const initialState = {
    user: null,
}

const AUTHENTICATED = "AUTHENTICATED";
const LOGOUT = "LOGOUT";
const UPDATE_USER = "UPDATE_USER";

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
    }
};

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