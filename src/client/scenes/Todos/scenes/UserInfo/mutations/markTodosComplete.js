/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type {
  markTodosCompleteMutationVariables,
  markTodosCompleteMutationResponse,
} from "./__generated__/markTodosCompleteMutation.graphql";
import type { UserInfo_info } from "../__generated__/UserInfo_info.graphql";

const mutation = graphql`
  mutation markTodosCompleteMutation($input: MarkTodosCompleteInput!) {
    markTodosComplete(input: $input) {
      updatedTodos {
        id
        complete
      }
      user {
        id
        countTodosComplete
      }
      clientMutationId
    }
  }
`;

function markTodosComplete(environment: Environment, user: UserInfo_info, complete: boolean) {
  const mutationId = v4();
  const variables: markTodosCompleteMutationVariables = {
    input: {
      userId: user.id,
      complete,
      clientMutationId: mutationId,
    },
  };

  if (!user.todos || !user.todos.edges) {
    return;
  }

  const todosLength = user.todos.edges.length;
  const updatedTodos = user.todos.edges
    .map(edge => edge && edge.node)
    .filter(Boolean)
    .filter(todo => todo.complete !== complete)
    .map(todo => ({
      id: todo.id,
      complete: todo.complete,
    }));

  const optimisticResponse: markTodosCompleteMutationResponse = {
    markTodosComplete: {
      updatedTodos,
      user: {
        id: user.id,
        countTodosComplete: complete ? todosLength : 0,
      },
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticResponse,
  });
}

export default markTodosComplete;
