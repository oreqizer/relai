/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type {
  createTodoMutationVariables,
  createTodoMutationResponse,
} from "./__generated__/createTodoMutation.graphql";
import type { TodoList_info } from "../__generated__/TodoList_info.graphql";

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
      user {
        id
        countTodos
      }
      clientMutationId
    }
  }
`;

function createTodo(environment: Environment, user: TodoList_info, text: string) {
  const mutationId = v4();
  const variables: createTodoMutationVariables = {
    input: {
      userId: user.id,
      text,
      clientMutationId: mutationId,
    },
  };

  const optimisticResponse: createTodoMutationResponse = {
    createTodo: {
      todoEdge: {
        cursor: mutationId,
        node: {
          id: mutationId,
          text,
          complete: false,
        },
      },
      user: {
        id: user.id,
        countTodos: user.countTodos + 1,
      },
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticResponse,
    configs: [
      {
        type: "RANGE_ADD",
        parentID: user.id,
        connectionInfo: [
          {
            key: "TodoList_todos",
            rangeBehavior: "append",
          },
        ],
        edgeName: "todoEdge",
      },
    ],
  });
}

export default createTodo;
