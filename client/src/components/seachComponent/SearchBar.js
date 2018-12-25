import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {searchKeywords} from '../searchFunction'


//display function to display the notes that were found
function Display(props) {

    const note = props.note
    const noteURL = "/viewnote/" + note.id
    let date =  note.updatedAt.substr(0,10);
    return (
        <div className="card my-3">
        <h4>Title: <Link to={noteURL}>{note.title}</Link></h4>
        <p>last update: {date}</p>
      </div>
    )
}

class SearchBar extends Component {
    constructor(){
        super()

        this.state = { 
            searchQuery: '',
            searchValue: 'title',
            callBackResponce: false,
            queryResult : [],
        }
    }

    //change value for what part to search to in notes 
    onChangeValue(e) {
        let searchValue = e.target.value;
        this.setState({ searchValue});
    }

    onChange(e) {
        let searchQuery = this.state.searchQuery;
        searchQuery = e.target.value;
        this.setState({ searchQuery });
    }

    onSubmit(e) {
        e.preventDefault()

        //get criteria for search 
        let keyword = this.state.searchQuery
        let test = keyword.split(" ")
        let path = this.state.searchValue

        //create object with keywords
        let keywords = {}
        test.map((val, index) => {
            keywords['key'+index] = val;
            return keywords;
        })

        //search for notes with keywords 
        searchKeywords(keywords,path)
        .then(results => {
            console.log(results.data)
            let queryResult = results.data;
            this.setState({queryResult,
                           callBackResponce: true})

        })
        .catch(err => {
            console.log(err)
        })

    }


    render(){


        //get the links for results
        const results =  this.state.queryResult.map( note => {
            return( <Display key={note.id} note={note} />)
        })

        //message
        let message = <h1>Search in notes</h1>
        let numberFound = this.state.queryResult.length

        if(this.state.callBackResponce){
            if(this.state.queryResult.length === 0){
                message = <h1>Found no results</h1>
            }else {
                message = <h3>Number of notes found: {numberFound}</h3>
            }
        }



        return(
            <div className="container text-center">
                <form onSubmit={(e) => this.onSubmit(e)}>
                <div className="form-row  mt-4">

                    <div className="col-auto">
                        <input className="form-control"
                        type="text"
                        onChange = { (e) => this.onChange(e) }
                        required></input>
                    </div>

                    <div className="col-auto">
                        <select className="custom-select" value={this.state.searchValue} onChange = { (e) => this.onChangeValue(e)}>
                        <option value="title">title</option>
                        <option value="body">body</option>
                        </select>
                    </div>

                    <div className="col-auto">
                    <button className="btn btn-info"
                                type="submit">search
                        </button>
                    </div>
                </div>
                </form>
            

                 <div className=" ">
                         {results}
                         <br></br>
                        {message}
                 </div>
                
                </div>
        )

    }
}



export default SearchBar;
