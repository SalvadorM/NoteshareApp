import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import { getUserByID } from '../userFunctions'
import  ViewUserNote  from '../noteComponents/reviewusernote'


import Auth from '../../utilities/auth'


/*
    Display user info 
    and if any note, render the notes
    else say no notes, publish a note 


*/

class User extends Component {

    constructor(){
        super()
        this.state = {
            name: '',
            id: '',
            callbackResponce: false
        }
    }

    componentDidMount(){

        const _id = Auth.getlocal('id')
        getUserByID(_id)
        .then(user => {
            this.setState({name: user.data.firstName,
                                 id: user.data.id,
                                 callbackResponce: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        
        if(this.state.callbackResponce){
            let name = this.state.name

            return(

                <div>
                    <div className="showcase1 align-middle">
                    <div className="text-center words">
                        {name}'s profile 
                        <br></br>
                        Notes created by {this.state.name}
                    </div>    
                    </div>

                    <div className="container text-center my-4">
                        <h2><Link className="badge badge-info" to="/newpost">Create a new note</Link></h2>
                          
                        <div className="mt-4">
                            <ViewUserNote findAllByID={this.state.id} />           
                        </div>
                    </div>
                </div>
            )
        }
            return(<div>loading dataa</div>) 
    }
;
}

export default User;