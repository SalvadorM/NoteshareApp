import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createnewnote } from '../userFunctions';


//image component 
import Images from '../imageComponents/images';


/*
This is the new note test, bascilly just post the new notes.

*/
class NewNote extends Component {
    constructor(props){
        super(props);

        this.state = {
            upload: {
                imageCB: false,
                imageURL: [],
            } ,
            errors: {},
            callBackResponce: false,
            client: {
               title:'',
               body:'',
               text:''
            },
            cancel: false,
         };
    }

    //callback function to pass down to images component 
    imageCallback = (dataFromChild) => {
        this.setState({ upload: dataFromChild})
    }

    onChange(e) {
        const client = this.state.client;
        const field = e.target.name;
        client[field] = e.target.value;
   
        this.setState({ client });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(this.state)

        const imagesCB = this.state.upload.imageCB;
    
        let images ; 
        if(imagesCB) {
             images = this.state.upload.imageURL
        } else {
             images = []
        }
    
        const newNote = {
            title : this.state.client.title,
            body : this.state.client.body,
            text : this.state.client.text,
            image : images
        }

        console.log(newNote);

        createnewnote(newNote)
        .then(res => {
            if(res){

                this.setState({ callBackResponce : !this.state.callBackResponce });
                console.log("Registered inside register: " + res);
            }
        });
        console.log('Sending post request ');
     
    }

    cancel(e){
       this.setState({cancel: true})
    }
    render () {
       
        const { callBackResponce, cancel } = this.state;
        if(cancel) {
            return  <Redirect to="/user" />
        }

        //if the new note was created with success
        //redirect to a new path to view the note
        if(callBackResponce) {
            return <Redirect to="/notes" />;

        } else {
 
            let imagesInfo;
            if(this.state.upload.imageCB){
                if(this.state.upload.imageURL.length !== 0){
                    imagesInfo = <div>
                    <p>Images uploaded {this.state.upload.imageURL.length}</p>
                    <button className="btn btn-danger " onClick={(e) => this.cancel(e)} >clear</button>
                    <p className="text-muted">Clear goes back to user page</p>
                </div>
                } else {
                    imagesInfo = <div></div>
                }
            }
            return(
                <div className="container text-center">
                <div className="">
                <div className="">
                <form className="form-group" name="login" onSubmit={ (e) => this.onSubmit(e)}>
                <div className="">

                    <h1>New Note</h1>
                    <label className="">Name your title</label>
                    <input name="title" 
                           className="form-control w-50"
                           type="text"
                           onChange = { (e) => this.onChange(e) }
                           required
                           ></input>

                    <label className="">Body</label>
                    <textarea name="body" 
                           className="form-control form-control-lg w-75"
                           type="text"
                           rows="3"
                           onChange = { (e) => this.onChange(e)}
                           required
                           ></textarea>
                    <br></br>
                    <label className="">keywords</label>
                    <textarea name="text" 
                           className="form-control w-75"
                           type="text"
                           rows="3"
                           onChange = { (e) => this.onChange(e)}
                           required
                          ></textarea>
                    <br></br>

                    <div >
                    <Images className="my-3" callbackFromParent={this.imageCallback}/>
                    </div>
                    {imagesInfo}
                </div >

                <button type="submit" className="btn btn-primary mt-3">Create Note</button>
                <button type="button" 
                            className="btn btn-outline-danger mt-3 ml-2" 
                            onClick={(e) => this.cancel(e)}>
                            cancel
                            </button>
                </form>
                </div>
                </div>
                </div>
    
            );
        }
    }
}

export default NewNote;