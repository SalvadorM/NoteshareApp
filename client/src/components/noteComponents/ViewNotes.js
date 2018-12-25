import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {  getAllTheNotes} from '../userFunctions'

function Display(props) {

    const note = props.note
    // console.log(note)
    const noteURL = "/viewnote/" + note.id

    return (
        <div className="col-6 col-xs-4 col-md-4 mt-2">
            <div className="card">
            <div className="card-body">
                <h1>{note.title}</h1>
                <Link className="btn btn-outline-info" to={noteURL}>Read More »</Link>
            </div>
            </div>
        </div>
    )
}
class ViewNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            callbackResponce:false,
            notes: []
        }
    }

    componentDidMount(){
        getAllTheNotes()
        .then(notes => {
            let noteArray = notes.data;
            this.setState({notes: noteArray,
                           callbackResponce: true})
                // console.log(notes.data);
        })
        .catch(err => {
            console.log(err)
        })
    }


    render(){
        if(this.state.callbackResponce){

            const notes = this.state.notes.map( note => {
                return(<Display key={note.id} note={note} /> );
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
export default ViewNote;