/* eslint-disable no-underscore-dangle */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema");

const app = express();

app.use(cors());

app.use(morgan("tiny"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(8081, () => {
  console.log("[graphql] Listening at 8081"); // eslint-disable-line no-console
});
