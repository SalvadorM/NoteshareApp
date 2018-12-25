import React, {Component} from 'react'

import { getNoteByID, getUserByID } from '../userFunctions'

function Displaypicture(props) {

    let imgURL = props.note
    return (
        <div className="mt-3 images">    
             <img className="img-fluid" src={imgURL} alt="pic"></img>
        </div>
    )
}

function Display(props) {

    const note = props.note

    const user = props.user
    
    console.log(user)
    return (
        <div className="border rounded border-dark mt-4 text-center">
        <div className="card-body">
            <h2>{note.title}</h2>
            <hr className="hrstyle"></hr>
            <p>{note.body}</p>
            <p>{note.text}</p>
            <div className="card-footer text-muted">Upload by {user.username}</div>
        </div>
        </div>
    )
}

class ViewUserNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: [],
            user: [],
            callbackResponce: false,
            comments: [],
        }
    }

    componentDidMount(){
        
            //get the notes from the user ID passed through props
            const id = this.props.id
            getNoteByID(id)
            .then(note => {
                //get user info
                getUserByID(note.data.userId)
                .then( user => {
                    this.setState({
                        note:note.data,
                        user: user.data,
                        callbackResponce: true,
                    })
                })
                .catch( err => {
                    console.log('User Error:' + err)
                })
            })
            .catch(err => {
                console.log('Note Error:' + err)
            })
    }


    render(){
        if(this.state.callbackResponce){
            const {note, user} = this.state;

            let notelist= <Display note ={note} user={user}/>
            
            let pictures = (<h3>N/A pictures</h3>)
            
            if(this.state.note.image.length > 0){
                pictures = this.state.note.image.map( image => {
                    return (<Displaypicture key={image} note={image}/>)
                })
            }

            return (
                <div className="container">
                    <div className=""> 
                        {notelist}
                        {pictures}
                     </div>
                </div>
                
            );
        }
       
        return (
            <div>LOADING NOTESSSS</div>
        );
    }
}
export default ViewUserNotes;