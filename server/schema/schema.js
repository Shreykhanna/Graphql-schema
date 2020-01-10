const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

// var books=[
//     {name:"Name of the winds", genre:"Fantasy",id:"1",authorId:"2"},
//     {name:"Final Empire", genre:"Fantasy",id:"2" ,authorId:"1"},
//     {name:"Lord of the rings", genre:"Fantasy",id:"3",authorId:"3"},

// ]
// var authors=[
//     {name:"Patrick Rothfuss", age:"43",id:"1"},
//     {name:"Brandon Sanderson", age:"44",id:"2"},
//     {name:"Terry Pratchett", age:"45",id:"3"}
// ]
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log("Parent argument value : ", parent);
        //return _.find(authors,{id:parent.authorId});
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books,{authorId:parent.id})
        return Book.find(parent.id)
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return Book.findById(args.id);
    }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors,{id:args.id})
        return Author.findById(args.id);
    }
    },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});
const Mutations=new GraphQLObjectType({
    name :"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age :{type:GraphQLInt}
            },
            resolve(parent,args){
                let author= new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
            name:{tye:GraphQLString},
            genre:{type:GraphQLString},
            authorId:{type:GraphQLString}
        },
        resolve(parent,args){
            let book=new Book({
                name:args.name,
                genre:args.genre,
                authorId:args.authorId
            })
            return book.save()
        }
        }
    }


})



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutations
});
