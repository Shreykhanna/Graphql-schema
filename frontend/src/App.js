import React from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

import "./App.css";
import BookList from "./component/BookList";
import AddAuthor from './component/AddBook'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Book Reading List</h1>
        <BookList />
        <AddAuthor/>
      </div>
    </ApolloProvider>
  );
}

export default App;
