/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import v4 from "uuid/v4";

import type { clearCompleteTodosMutationVariables } from "./__generated__/clearCompleteTodosMutation.graphql";
import type { TodoList_info } from "../__generated__/TodoList_info.graphql";

const mutation = graphql`
  mutation clearCompleteTodosMutation($input: ClearCompleteTodosInput!) {
    clearCompleteTodos(input: $input) {
      deletedTodoIds
      user {
        id
        countTodos
        countTodosComplete
      }
      clientMutationId
    }
  }
`;

function sharedUpdater(store, user, deletedIDs) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, "TodoList_todos");
  deletedIDs.forEach(deletedID => ConnectionHandler.deleteNode(conn, deletedID));
}

function markTodosComplete(environment: Environment, user: TodoList_info) {
  const mutationId = v4();
  const variables: clearCompleteTodosMutationVariables = {
    input: {
      userId: user.id,
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    updater: store => {
      const payload = store.getRootField("clearCompleteTodos");
      sharedUpdater(store, user, payload.getValue("deletedTodoIds"));
    },
    optimisticUpdater: store => {
      if (user.todos && user.todos.edges) {
        const deletedIDs = user.todos.edges
          .map(edge => edge && edge.node)
          .filter(Boolean)
          .filter(todo => todo.complete)
          .map(todo => todo.id);

        const userProxy = store.get(user.id);
        userProxy.setValue("countTodos", user.countTodos - deletedIDs.length);
        userProxy.setValue("countTodosComplete", 0);
        sharedUpdater(store, user, deletedIDs);
      }
    },
  });
}

export default markTodosComplete;
