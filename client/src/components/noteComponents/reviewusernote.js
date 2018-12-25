import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { getAllNotes } from '../userFunctions'

function Display(props) {

    const note = props.note
    const noteURL = "/viewnote/" + note.id
    let date =  note.updatedAt.substr(0,10);
    // console.log(note)
    return (
        <div className="col-6 col-xs-4 col-md-4 mt-2">
            <div className="card">  
            <div className="card-body">
                <h1 id="dark">{note.title}</h1>
                <p className="card-subtitle mb-3 text-muted">last update: {date}</p> 
                <Link className="btn btn-outline-info" to={noteURL}>READ MORE »</Link>
            </div>
            </div>
        </div>
    )
}

class ViewUserNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            callbackResponce: false,
        }
    }

    componentDidMount(){
            //get the notes from the user ID passed through props
            let _id = this.props.findAllByID
            getAllNotes(_id)
            .then(notes => {
            
                let noteArray = notes.data;
                this.setState({notes: noteArray,
                               callbackResponce: true})
            })
            .catch(err => {
                console.log(err)
            })

    }


    render(){
        if(this.state.callbackResponce){
            const notes = this.state.notes.map( note => {
                return(       
               
                        <Display key={note.id} note={note} />    
                
                );
            })
     
            return (

                <div className="row">
                    {notes}
                </div>

            );
        }
       
        return (
            <div>
                LOADING NOTESSSS
            </div>
        );
    }
}
export default ViewUserNotes;