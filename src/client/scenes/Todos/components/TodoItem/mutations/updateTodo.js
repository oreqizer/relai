/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type { updateTodoMutationVariables } from "./__generated__/updateTodoMutation.graphql";
import type { TodoItem_item } from "../__generated__/TodoItem_item.graphql";

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
        countTodos
        countTodosComplete
      }
      clientMutationId
    }
  }
`;

function updateTodo(environment: Environment, userId: string, todo: TodoItem_item) {
  const mutationId = v4();
  const variables: updateTodoMutationVariables = {
    input: {
      userId,
      ...todo,
      clientMutationId: mutationId,
    },
  };

  // TODO adjust user counts
  // const optimisticResponse: updateTodoMutationResponse = {
  //   updateTodo: {
  //     todoEdge: {
  //       cursor: todo.id,
  //       node: todo,
  //     },
  //     clientMutationId: mutationId,
  //   },
  // },

  commitMutation(environment, {
    mutation,
    variables,
    // optimisticResponse,
  });
}

export default updateTodo;
