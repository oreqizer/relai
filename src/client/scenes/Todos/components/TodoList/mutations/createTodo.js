/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type { createTodoMutationVariables } from "./__generated__/createTodoMutation.graphql";

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

function createTodo(environment: Environment, userId: string, text: string) {
  const mutationId = v4();
  const variables: createTodoMutationVariables = {
    input: {
      userId,
      text,
      clientMutationId: mutationId,
    },
  };

  // TODO user counts
  // const optimisticResponse: createTodoMutationResponse = {
  //   createTodo: {
  //     todoEdge: {
  //       cursor: mutationId,
  //       node: {
  //         id: mutationId,
  //         text,
  //         complete: false,
  //       },
  //     },
  //     clientMutationId: mutationId,
  //   },
  // },

  commitMutation(environment, {
    mutation,
    variables,
    // optimisticResponse,
    configs: [
      {
        type: "RANGE_ADD",
        parentID: userId,
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
