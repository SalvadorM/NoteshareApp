import React, {Component} from 'react'
import {newcom, getAllComments} from '../userFunctions'


function DisplayComment(props) {

    const comment = props.comment
    console.log(comment)
    return (
        <div  className="border rounded my-3 w-75">
            <p className="">{comment.body}</p>
        </div>
    )
}

class Comment extends Component{
    constructor(props){
        super(props)

        this.state = { 
            body: '',
            commentCB: false,
            comments: [],
            newComment: false,
        }
    }
    onChange(e) {
        let body = this.state.body;
        body = e.target.value;
        this.setState({body});
    }
    onSubmit(e) {
        e.preventDefault();
        //post fetch
        const note_id = this.props.findAllByid;
        const user_id = this.props.userid;
        console.log(note_id);
       
       const newCom = {
        noteId : note_id,
        userId : user_id,
        body : this.state.body,
        }

        console.log(newCom);
        newcom(newCom)
        .then( () => {
            getAllComments(note_id)
            .then( comments =>{
                    this.setState({
                        comments:comments.data,
                        commentCB: true,
                    })
            })
            .catch( err => {
                    console.log(err)
            })
        })
        .catch( err => {
            console.log(err)
        });
    }

    componentDidMount(){
        const noteId = this.props.findAllByid;
        getAllComments(noteId)
                .then( comments =>{
                    this.setState({
                        comments:comments.data,
                        commentCB: true,
                    })
                })
                .catch( err => {
                    console.log(err)
                })
    }


    render(){

        let comments = (<div> <h1>No Comments</h1></div>)
        if(this.state.commentCB){
            comments = this.state.comments.map( comment => {
                return (<DisplayComment key={comment.id} comment={comment} />)
            })
        }
        return(
            <div className="container border rounded border-primary mt-4 text-center">
                <h4 className=""> Comments</h4>
                {comments} 
   

                <div className="w-50 mt-4">
                <form onSubmit={(e) => this.onSubmit(e)}>
            
               
                    <input className="form-control"
                           onChange = { (e) => this.onChange(e) }
                           required></input>
               
        
                    <button className="btn btn-primary"
                            type="submit">Comment
                    </button>
               
                
                </form>
                </div>


            </div>
            
        );
    }
}

export default Comment;