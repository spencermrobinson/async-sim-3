import axios from 'axios';
const initialState = {
    user: {},
}

const AUTHENTICATED = "AUTHENTICATED";
export default ( state = initialState, action ) => {
    const { payload } = action;

    switch( action.type ){
        
        case AUTHENTICATED + '_FULFILLED':
        return Object.assign( {}, state, { user: payload});

        default: return state;
    }
};

export function authenticated(history, currentPath, optionalSuccessRedirect ){
    const promise = axios.get(`/auth/authenicate`).then(response => {
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