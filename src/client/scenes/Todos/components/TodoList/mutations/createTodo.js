/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

const mutation = graphql`
  mutation createTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      todo {
        id
      }
      clientMutationId
    }
  }
`;

function createTodo(environment: Environment, author: string, text: string) {
  const variables = {
    input: {
      author,
      text,
      complete: false,
      clientMutationId: v4(),
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: console.log,
    onError: console.error,
  });
}

export default createTodo;
