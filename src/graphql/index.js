const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input TodoInput {
    author: String!
    text: String!
    complete: Boolean!
  }

  type Todo {
    id: ID!
    author: String!
    text: String!
    complete: Boolean!
  }
  
  type Query {
    getTodos(author: String!): [Todo]!
  }
  
  type Mutation {
    createTodo(input: TodoInput): Todo
    updateTodo(id: ID!, input: TodoInput): Todo
    deleteTodo(id: ID!, author: String!): Todo
  }
`);

// If it had any complex fields, we'd put them on this object.
const newTodo = (id, { author, text, complete }) => ({
  id,
  author,
  text,
  complete,
});

// Maps username to content
const fakeDatabase = {};

const root = {
  getTodos({ author }) {
    return Object.keys(fakeDatabase)
      .map(id => fakeDatabase[id])
      .filter(todo => todo.author === author);
  },
  createTodo({ input }) {
    // Create a random id for the "database".
    const id = crypto.randomBytes(10).toString("hex");

    const msg = newTodo(id, input);
    fakeDatabase[id] = msg;
    return msg;
  },
  updateTodo({ id, input }) {
    if (!fakeDatabase[id] || !fakeDatabase[id].author !== input.author) {
      throw new Error(`No message exists with id ${id}`);
    }

    const msg = newTodo(id, input);
    fakeDatabase[id] = msg;
    return msg;
  },
  deleteTodo({ id, author }) {
    if (!fakeDatabase[id] || !fakeDatabase[id].author !== author) {
      throw new Error(`No message exists with id ${id}`);
    }

    const msg = fakeDatabase[id];
    delete fakeDatabase[id];
    return msg;
  },
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.listen(8081, () => {
  console.log("[graphql] Listening at 8081"); // eslint-disable-line no-console
});
