import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import Auth from '../utilities/auth'

class Home extends Component {

    

    render() {
        const name = Auth.getlocal('firstName')
        let logStatus;
        if (Auth.getlocal('id')){
            logStatus = <h1 className="">Welcome {name}</h1>
        }else {
            logStatus = (<div>
                        <Link className="btn btn-outline-primary mb-2 mr-2" to="/login">Login</Link> 
                        <Link className="btn btn-outline-secondary mb-2" to="/signup">Register</Link>
                        </div>)
        }
        return (
            <div className="showcase">  
                <div className="row align-items-center h-100">
                <div className="text-center middle">
		            <div className="">{logStatus}</div>
                    <hr></hr>
                    <h4 className="">
                    Welcome to CAUSEnotes, a one stop shop for CUNY students to freely share and view notes among students, for free. 
                    </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;