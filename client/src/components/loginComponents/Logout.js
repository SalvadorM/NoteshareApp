import React from 'react';
const Auth = require('../../utilities/auth')

const LogOut = () => {

    function clearLocalStorage(e) {
        e.preventDefault();
        Auth.signout()

    }

    if (Auth.getlocal('id')){
        return (
            <button type="button" 
                    className="btn btn-sm btn-outline-danger ml-2" 
                    onClick={clearLocalStorage}>
                    Sign Out
                    </button>
          
        )
    }else {
        return (<div></div>)
    }
  

}

export default LogOut;