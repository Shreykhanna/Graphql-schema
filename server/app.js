const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema =require('./schema/schema')
const app=express();

const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/book-table')
app.use('/graphql',graphqlHTTP({
schema:schema,
graphiql:true
}))
mongoose.connection.once('open',()=>{
console.log("connected to the database")
});


app.listen(4000,()=>{
    console.log("Running at the port 4000")
})
