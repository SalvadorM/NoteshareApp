import React, { Component } from 'react'
import Comment from '../commentComponent/comments'
import Auth from '../../utilities/auth'
import IndvidualNote from './IndividualNote';

class RenderNote extends Component {
    
    render(){

         let _username=Auth.getlocal('username')
         let userid = Auth.getlocal('id')
       
        //  console.log("hello");
         const id = this.props.match.params.id

        return (
            <div  className="">
    
                <div  className="">
                <IndvidualNote key={id} noteId ={id} id={id} /> 
                </div>

                <Comment findAllByid ={id} userid={userid}/>
          
            </div>       
        );
    }
    
}


export default RenderNote;