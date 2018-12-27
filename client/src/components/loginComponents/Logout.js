import React, { Component } from 'react';
import { Redirect } from 'react-router';
const Auth = require('../../utilities/auth')

class LogOut extends Component {

    constructor(){
        super()
        this.state = {
            logOutCb: false,
        };
    }

    componentWillMount(){
       if(Auth.getlocal('isAuthenticated') === 'false') {
        this.setState({ logOutCb: false })
       }
    }

    clearLocalStorage(e) {
        e.preventDefault();
         Auth.signout(()=> {
            this.setState({ logOutCb: true })
         })
        
    }

    render() {
        const { logOutCb } = this.state;
        if(logOutCb) {
            return  <Redirect to="/login" />
        }else {
            if (Auth.getlocal('id')){
                return (
                    <button type="button" 
                            className="btn btn-sm btn-outline-danger ml-2" 
                            onClick={this.clearLocalStorage.bind(this)}>
                            Sign Out
                            </button>
                )
            }
            return(<div></div>)
        }

    }
}

export default LogOut;