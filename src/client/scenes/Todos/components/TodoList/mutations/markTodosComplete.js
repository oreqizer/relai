/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type { markTodosCompleteMutationVariables } from "./__generated__/markTodosCompleteMutation.graphql"

const mutation = graphql`
  mutation markTodosCompleteMutation($input: MarkTodosCompleteInput!) {
    markTodosComplete(input: $input) {
      updatedTodos {
        id
        complete
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

function markTodosComplete(environment: Environment, userId: string, complete: boolean) {
  const mutationId = v4();
  const variables: markTodosCompleteMutationVariables = {
    input: {
      userId,
      complete,
      clientMutationId: mutationId,
    },
  };

  // TODO
  // const optimisticResponse: markTodosCompleteMutationResponse = {
  //
  // };

  commitMutation(environment, {
    mutation,
    variables,
    // optimisticResponse,
  });
}

export default markTodosComplete;
