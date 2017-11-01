/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type { deleteTodoMutationVariables } from "./__generated__/deleteTodoMutation.graphql";

const mutation = graphql`
  mutation deleteTodoMutation($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      deletedId
      user {
        id
        countTodos
        countTodosComplete
      }
      clientMutationId
    }
  }
`;

function deleteTodo(environment: Environment, userId: string, todoId: string) {
  const mutationId = v4();
  const variables: deleteTodoMutationVariables = {
    input: {
      userId,
      todoId,
      clientMutationId: mutationId,
    },
  };

  // TODO user counts
  // const optimisticResponse: deleteTodoMutationResponse = {
  //
  // }

  commitMutation(environment, {
    mutation,
    variables,
    // optimisticResponse,
    configs: [
      {
        type: "NODE_DELETE",
        deletedIDFieldName: "deletedId",
      },
    ],
  });
}

export default deleteTodo;
