/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

const mutation = graphql`
  mutation deleteTodoMutation($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      deletedId
      clientMutationId
    }
  }
`;

function deleteTodo(environment: Environment, userId: string, id: string) {
  const mutationId = v4();
  const variables = {
    input: {
      userId,
      id,
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticResponse: {
      deleteTodo: {
        deletedId: id,
        clientMutationId: mutationId,
      },
    },
    configs: [
      {
        type: "NODE_DELETE",
        deletedIDFieldName: "deletedId",
      },
    ],
  });
}

export default deleteTodo;
