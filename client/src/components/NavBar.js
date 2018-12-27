import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (

        <div className="navbar navbar-dark bg-dark"> 
         
        <nav className="container">   
            <span className="branding navbar-brand"> CAUSEnotes </span>
            <div className="nav">
                <Link className="nav-item" to="/" > Home</Link>
                <Link className="nav-item" to="/user"> User</Link>
                <Link className="nav-item" to="/notes"> Notes</Link>
                <Link className="nav-item" to="/search"> Search</Link>
            </div>
        </nav> 

        </div>
        


    )
}

export default NavBar;