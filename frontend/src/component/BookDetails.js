import React, { Component } from 'react'
import {graphql} from 'react-apollo'
import {getDetailsQuery} from '../queries/Queries'

class BookDetails extends Component{
     displayBookDetails(){
        const {book}=this.props.data;
        console.log(book);
        if(book){
            return(
            <div>
               <h2>{book.name}</h2> 
               <p>{book.genre}</p>
               <p>{book.author}</p> 
                <p>All books by this author : </p>
               {/* <ul className="all-books">
                {
                book.author.book.map(item=>{
                    return <li key={item.id}>{item.name}</li>
                })}
                </ul> */}
            </div>
            )
        }else
        {
            return(
            <div>No Book selected...</div>
            )
        }
   }
    render(){
        console.log(this.props);
        return (
            <div id="book-details">
                <p>Book Details</p>
                {this.displayBookDetails()}
            </div>
        )
    }
}
export default graphql(getDetailsQuery,{
    options:(props)=>{
        return{
            variables: {
                id:props.bookId
            }
        }
    }
})(BookDetails); 
