/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

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
  const variables = {
    input: {
      userId,
      todoId,
      clientMutationId: mutationId,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    // TODO adjust user counts
    // optimisticResponse: {
    //   deleteTodo: {
    //     deletedId: todoId,
    //     clientMutationId: mutationId,
    //   },
    // },
    configs: [
      {
        type: "NODE_DELETE",
        deletedIDFieldName: "deletedId",
      },
    ],
  });
}

export default deleteTodo;
