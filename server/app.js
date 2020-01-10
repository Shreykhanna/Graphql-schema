const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema =require('./schema/schema')
const app=express();

const mongoose=require('mongoose')
mongoose.connect('mongodb://')
app.use('/graphql',graphqlHTTP({
schema:schema,
graphiql:true
}))
app.listen(4000,()=>{
    console.log("Running at the port 4000")
})
