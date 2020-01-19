import React, { Component } from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'
import {getBookQuery} from '../queries/Queries'
import BookDetails from '../component/BookDetails'

class BookList extends Component {
    state={
        id:null
    }
    displayBooks(){
        var data=this.props.data;
        console.log("Data passed in booklist compnent : "+data.book);
        if(data.loading){
            return <div>Loading Books</div>
        }else{
            return data.book.map(book=>{
            return(
                <li key={book.id} onClick={(event)=>this.setState({id:book.id})}>{book.name}</li>
            )
            })
        }
    }
  render() {
      console.log(this.props)
      console.log(this.state.id);
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
          <BookDetails bookId={this.state.id}/>
        </ul>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
