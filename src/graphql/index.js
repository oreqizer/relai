/* eslint-disable no-underscore-dangle */
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

const schemaString = String(fs.readFileSync(path.join(__dirname, "schema.graphql")));
const schema = buildSchema(schemaString);

// If it had any complex fields, we'd put them on this object.
const newTodo = (id, position, { author, text, complete }) => ({
  id,
  author,
  text,
  complete,
  __position: position,
});

// Maps username to content
let position = 0;
const fakeDatabase = {};

const root = {
  todos({ /* first, after, */ author }) {
    const edges = Object.keys(fakeDatabase)
      .map(id => ({
        node: fakeDatabase[id],
        cursor: id,
      }))
      .filter(edge => edge.node.author === author)
      .sort((a, b) => (a.__position > b.__position ? 1 : -1));
    // TODO pagination

    return {
      edges,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },
  createTodo({ input }) {
    // Create a random id for the "database".
    const id = crypto.randomBytes(10).toString("hex");

    const todo = newTodo(id, position, input);
    fakeDatabase[id] = todo;
    position += 1;
    return {
      todoEdge: {
        cursor: todo.id,
        node: todo,
      },
      clientMutationId: input.clientMutationId,
    };
  },
  updateTodo({ input }) {
    if (!fakeDatabase[input.id]) {
      throw new Error(`No message exists with id ${input.id}`);
    }

    const todo = newTodo(input.id, input);
    fakeDatabase[input.id] = todo;
    return {
      todoEdge: {
        cursor: todo.id,
        node: todo,
      },
      clientMutationId: input.clientMutationId,
    };
  },
  deleteTodo({ input }) {
    if (!fakeDatabase[input.id]) {
      throw new Error(`No message exists with id ${input.id}`);
    }

    const todo = fakeDatabase[input.id];
    delete fakeDatabase[input.id];
    return {
      todoEdge: {
        cursor: todo.id,
        node: todo,
      },
      clientMutationId: input.clientMutationId,
    };
  },
};

const app = express();

app.use(cors());

app.use(morgan("tiny"));

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
