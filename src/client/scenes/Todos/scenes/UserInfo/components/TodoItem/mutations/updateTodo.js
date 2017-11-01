/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type {
  updateTodoMutationVariables,
  updateTodoMutationResponse,
} from "./__generated__/updateTodoMutation.graphql";
import type { TodoItem_item } from "../__generated__/TodoItem_item.graphql";
import type { UserInfo_info } from "../../../__generated__/UserInfo_info.graphql";

const mutation = graphql`
  mutation updateTodoMutation($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      todoEdge {
        cursor
        node {
          id
          text
          complete
        }
      }
      user {
        id
        countTodosComplete
      }
      clientMutationId
    }
  }
`;

function getCountDiff(oldTodo: TodoItem_item, newTodo: TodoItem_item) {
  if (oldTodo.complete === newTodo.complete) {
    return 0;
  }

  return newTodo.complete ? 1 : -1;
}

function updateTodo(
  environment: Environment,
  user: UserInfo_info,
  oldTodo: TodoItem_item,
  newTodo: TodoItem_item,
) {
  const mutationId = v4();
  const variables: updateTodoMutationVariables = {
    input: {
      userId: user.id,
      ...newTodo,
      clientMutationId: mutationId,
    },
  };

  const optimisticResponse: updateTodoMutationResponse = {
    updateTodo: {
      todoEdge: {
        cursor: newTodo.id,
        node: newTodo,
      },
      user: {
        id: user.id,
        countTodosComplete: user.countTodosComplete + getCountDiff(oldTodo, newTodo),
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

export default updateTodo;
