/* @flow */
import { commitMutation, graphql } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

const mutation = graphql`
  mutation createTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      todoEdge {
        cursor
        node {
          id
          text
          complete
        }
      }
      clientMutationId
    }
  }
`;

function sharedUpdater(store, todoEdge) {
  const root = store.getRoot();
  const conn = ConnectionHandler.getConnection(root, "TodoList_todos");

  ConnectionHandler.insertEdgeAfter(conn, todoEdge);
}

function createTodo(environment: Environment, author: string, text: string) {
  const mutationId = v4();
  const variables = {
    input: {
      author,
      text,
      complete: false,
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    updater: store => {
      const mutationRoot = store.getRootField("createTodo");
      const todoEdge = mutationRoot.getLinkedRecord("todoEdge");
      sharedUpdater(store, todoEdge);
    },
    optimisticUpdater: store => {
      // TODO
    },
  });
}

export default createTodo;
