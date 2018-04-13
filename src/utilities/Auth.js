export default function(reducerFn, userObj, historyObj, optionalSuccessRedirect, optionalAlreadyAuthenticatedUrl, optionalFunctions){
    const currentPath= historyObj.location.pathname;
    if( userObj === null){
        reducerFn( historyObj, currentPath, optionalSuccessRedirect || null);
    } else if( userObj !== null && optionalAlreadyAuthenticatedUrl){
        historyObj.push( optionalAlreadyAuthenticatedUrl);
    }else if (userObj !== null && optionalFunctions){
        for( var i = 0; i < optionalFunctions.length; i++ ){
            optionalFunctions[i].fn.apply(null, optionalFunctions[i].params);
        }
    }
}