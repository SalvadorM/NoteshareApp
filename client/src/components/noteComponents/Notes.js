import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ViewNotes from './ViewNotes';


class Notes extends Component {
    
    render() {
        return(
            <div className="">
            <div className="">
                <div className="showcase2 align-middle">
                    <div className="text-center words">All the notes to preview</div>
                </div>

                <div className="container text-center my-4">
                   
                        <h2><Link className="badge badge-info" to="/newpost">Create a new note</Link></h2>
                
                    
                    <div className="mt-4">
                        <div ><ViewNotes /></div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Notes;