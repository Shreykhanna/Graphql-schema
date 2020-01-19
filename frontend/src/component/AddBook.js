import React, { Component } from "react";
import { gql } from 'apollo-boost';
import { graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import {getBookQuery,getAuthorQuery,addBookQuery,addAuthorQuery} from '../queries/Queries'
//import {compose} from 'lodash' 


class AddBook extends Component {
    state={
        bookname:"",
        genre : "",
        authorId:""
        
    }
    displayAuthor(){
        var data=this.props.getAuthorQuery;
        if(data.loading){
            return (<option>Select Author</option>)
        }else{
            return data.authors.map(author=>{
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

   submitForm=(event)=>{
   event.preventDefault();
    this.props.addBookQuery({
        variables:{
            name:this.state.bookname,
            genre:this.state.genre,
            authorId:this.state.authorId,
            

        },
        refetchQueries:[{query : getBookQuery}]
    })
    console.log(this.state.bookname+","+this.state.genre)
    }
    render() {
        console.log(this.props)
        return (
            <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                <label>Book Name</label>
                <input type="text" onChange={(e)=>this.setState({bookname:e.target.value})} ></input>
                </div>
                
                <div className="field">
                <label>Genre</label>
                <input type="text" onChange={(e)=>this.setState({genre:e.target.value})} ></input>
                </div>
                
                <div className="field">
                <label>Author</label>
                <select onChange={(e)=>this.setState({authorId:e.target.value})}>
                    <option>Select Authors</option>
                    {this.displayAuthor()}
                </select>
                </div>
            <button>+</button>
            </form>
        )
    }
}
//export default graphql(getAuthorQuery)(AddBook)

export default compose(
    graphql(getAuthorQuery,{name:"getAuthorQuery"}),
  //  graphql(getBookQuery,{name:"getBookQuery"}),
  //  graphql(addAuthorQuery,{name:"addAuthorQuery"}),
    graphql(addBookQuery,{name:"addBookQuery"})
)(AddBook);