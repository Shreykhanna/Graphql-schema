import { gql } from 'apollo-boost';

const getAuthorQuery = gql`
{
    authors{
        name
        id
    }
}`
const getBookQuery=gql `
{
    book{
        name
        id
    }
}
`
const addAuthorQuery= gql`
mutation{
       addAuthor(name:"",age:""){
        name,
        age
       }
}`
const addBookQuery=gql`
mutation($name:String!,$genre:String!,$authorId:String!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name,
        genre
    }
}`
export  {getAuthorQuery,getBookQuery, addBookQuery}