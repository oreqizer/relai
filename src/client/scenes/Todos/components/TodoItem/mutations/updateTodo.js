/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

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
      clientMutationId
    }
  }
`;

function updateTodo(environment: Environment, userId: string, todo: TodoItem_item) {
  const mutationId = v4();
  const variables = {
    input: {
      userId,
      ...todo,
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticResponse: {
      updateTodo: {
        todoEdge: {
          cursor: todo.id,
          node: todo,
        },
        clientMutationId: mutationId,
      },
    },
  });
}

export default updateTodo;
