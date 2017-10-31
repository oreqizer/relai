const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");
const relay = require("graphql-relay");

const db = require("./database");

/**
 * See 'schema.graphqls' for shorthand notation
 */

/**
 * We define our basic todo type.
 *
 * This implements the following type system shorthand:
 *   type Todo {
 *     id: ID!
 *     text: String!
 *     complete: Boolean!
 *   }
 */
const todoType = new GraphQLObjectType({
  name: "Todo",
  description: "A todo item.",
  // interfaces: [nodeInterface], TODO how the fuck??
  fields: () => ({
    id: relay.globalIdField(),
    text: {
      type: GraphQLNonNull(GraphQLString),
      description: "The text of the todo.",
    },
    complete: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  }),
});

/**
 * We define a connection between a user and his todos.
 *
 * connectionType implements the following type system shorthand:
 *   type TodoConnection {
 *     edges: [TodoEdge]
 *     pageInfo: PageInfo!
 *   }
 *
 * connectionType has an edges field - a list of edgeTypes that implement the
 * following type system shorthand:
 *   type TodoEdge {
 *     cursor: String!
 *     node: Todo
 *   }
 */
const { connectionType: todoConnection, edgeType: todoEdge } = relay.connectionDefinitions({
  nodeType: todoType,
});

/**
 * We define the user type.
 *
 * This implements the following type system shorthand:
 *   type User {
 *     id: ID!
 *     name: String!
 *     todos: TodoConnection
 *   }
 */
const userType = new GraphQLObjectType({
  name: "User",
  description: "A user.",
  // interfaces: [nodeInterface], TODO how the fuck??
  fields: () => ({
    id: relay.globalIdField(),
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "The name of the user.",
    },
    todos: {
      type: todoConnection,
      description: "User's todos.",
      args: relay.connectionArgs,
      resolve: (user, args) => relay.connectionFromArray(user.todos.map(db.getTodo), args),
    },
  }),
});

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object. The second is the
 * way we resolve an object that implements node to its type.
 */
const { /* nodeInterface, */ nodeField } = relay.nodeDefinitions(globalId => {
  const { type, id } = relay.fromGlobalId(globalId);
  if (type === "User") {
    return db.getUser(id);
  }
  if (type === "Todo") {
    return db.getTodo(id);
  }
}, obj => (obj.todos ? userType : todoType));

/**
 * This is the type that will be the root of our query, and the
 * entry point into our schema.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     user: User
 *     node(id: String!): Node
 *   }
 */
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: userType,
      resolve: user => db.getUserByName(user.name),
    },
    node: nodeField,
  }),
});

// TODO comment
const createTodoMutation = relay.mutationWithClientMutationId({
  name: "CreateTodo",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    todoEdge: {
      type: todoEdge,
      resolve: payload => {
        const todo = db.getTodo(payload.todoId);
        return {
          cursor: todo.id,
          node: todo,
        };
      },
    },
  },
  mutateAndGetPayload: ({ userId, text }) => {
    const todo = db.createTodo(userId, text);
    return {
      todoId: todo.id,
    };
  },
});

// TODO comment
const updateTodoMutation = relay.mutationWithClientMutationId({
  name: "UpdateTodo",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    todo: {
      type: todoType,
    },
  },
  outputFields: {
    todoEdge: {
      type: todoEdge,
      resolve: payload => {
        const todo = db.getTodo(payload.todoId);
        return {
          cursor: todo.id,
          node: todo,
        };
      },
    },
  },
  mutateAndGetPayload: ({ userId, todo }) => {
    const updatedTodo = db.updateTodo(userId, todo);
    return {
      todoId: updatedTodo.id,
    };
  },
});

// TODO comment
const deleteTodoMutation = relay.mutationWithClientMutationId({
  name: "DeleteTodo",
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    todoId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    deletedId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: payload => payload.deletedId,
    },
  },
  mutateAndGetPayload: ({ userId, todoId }) => {
    const deletedId = db.deleteTodo(userId, todoId);
    return { deletedId };
  },
});

/**
 * This is the type that will be the root of our mutations, and the
 * entry point into performing writes in our schema.
 *
 * This implements the following type system shorthand:
 *   type Mutation {
 *     createTodo(input CreateTodoInput!): CreateTodoPayload
 *     updateTodo(input UpdateTodoInput!): UpdateTodoPayload
 *     deleteTodo(input DeleteTodoInput!): DeleteTodoPayload
 *   }
 */
const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
const TodoSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = TodoSchema;
