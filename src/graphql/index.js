/* eslint-disable no-underscore-dangle */
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

const schemaString = String(fs.readFileSync(path.join(__dirname, "../../schema.graphqls")));
const schema = buildSchema(schemaString);

// Maps username to content
let globalPosition = 0;
const fakeUserDB = {};
const fakeTodoDB = {};

const newUser = (id, { name }) => ({
  id,
  name,
  todos(/* { first, after } */) {
    const edges = Object.keys(fakeTodoDB[id] || {})
      .map(tid => ({
        node: fakeTodoDB[id][tid],
        cursor: tid,
      }))
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
});

const newTodo = (id, userId, position, { text, complete }) => ({
  id,
  text,
  complete,
  __position: position,
});

const root = {
  // Query
  // ---
  user({ name }) {
    if (fakeUserDB[name]) {
      return fakeUserDB[name];
    }

    // Create a random id for the "database".
    const id = crypto.randomBytes(10).toString("hex");
    const user = newUser(id, { name });
    fakeUserDB[name] = user;
    fakeTodoDB[id] = {};
    return user;
  },

  // Mutations
  // ---
  createTodo({ input }) {
    if (!fakeTodoDB[input.userId]) {
      throw new Error(`No user exists with id ${input.userId}`);
    }

    // Create a random id for the "database".
    const id = crypto.randomBytes(10).toString("hex");

    const todo = newTodo(id, input.userId, globalPosition, input);
    fakeTodoDB[input.userId][id] = todo;
    globalPosition += 1;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          todoEdge: {
            cursor: todo.id,
            node: todo,
          },
          clientMutationId: input.clientMutationId,
        });
      }, 1000);
    });
  },
  updateTodo({ input }) {
    if (!fakeTodoDB[input.userId]) {
      throw new Error(`No user exists with id ${input.userId}`);
    }

    if (!fakeTodoDB[input.userId][input.id]) {
      throw new Error(`No todo exists with id ${input.id}`);
    }

    const position = fakeTodoDB[input.userId][input.id].__position;
    const todo = newTodo(input.id, input.userId, position, input);
    fakeTodoDB[input.userId][input.id] = todo;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          todoEdge: {
            cursor: todo.id,
            node: todo,
          },
          clientMutationId: input.clientMutationId,
        });
      }, 1000);
    });
  },
  deleteTodo({ input }) {
    if (!fakeTodoDB[input.userId]) {
      throw new Error(`No user exists with id ${input.userId}`);
    }

    if (!fakeTodoDB[input.userId][input.id]) {
      throw new Error(`No todo exists with id ${input.id}`);
    }

    delete fakeTodoDB[input.userId][input.id];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          deletedId: input.id,
          clientMutationId: input.clientMutationId,
        });
      }, 1000);
    });
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
