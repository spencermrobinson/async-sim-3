
const initialState = {
    user: {},
}

const AUTHENTICATED = "AUTHENTICATED";
export default ( state = initialState, action ) => {
    const { payload } = action;

    switch( action.type ){
        
        case AUTHENTICATED + '_FULFILLED':
        return Object.assign( {}, state, { user: payload})
    }
}