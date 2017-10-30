/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

const mutation = graphql`
  mutation createTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      todo {
        id
        author
        text
        complete
      }
      clientMutationId
    }
  }
`;

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
    optimisticResponse: {
      createTodo: {
        todo: {
          id: mutationId,
          author,
          text,
          complete: false,
        },
        clientMutationId: mutationId,
      },
    },
    configs: [
      {
        type: "RANGE_ADD",
        parentID: "todos",
        connectionInfo: [
          {
            key: "TodoList_list",
            rangeBehavior: "append",
          },
        ],
        edgeName: "todo",
      },
    ],
    onCompleted: console.log,
    onError: console.error,
  });
}

export default createTodo;
