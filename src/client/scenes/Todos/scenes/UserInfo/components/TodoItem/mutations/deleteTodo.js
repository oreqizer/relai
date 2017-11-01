/* @flow */
import { commitMutation, graphql } from "react-relay";
import type { Environment } from "react-relay";
import v4 from "uuid/v4";

import type {
  deleteTodoMutationVariables,
  deleteTodoMutationResponse,
} from "./__generated__/deleteTodoMutation.graphql";
import type { TodoItem_item } from "../__generated__/TodoItem_item.graphql";
import type { UserInfo_info } from "../../../__generated__/UserInfo_info.graphql";

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

function deleteTodo(environment: Environment, user: UserInfo_info, todo: TodoItem_item) {
  const mutationId = v4();
  const variables: deleteTodoMutationVariables = {
    input: {
      userId: user.id,
      todoId: todo.id,
      clientMutationId: mutationId,
    },
  };

  const optimisticResponse: deleteTodoMutationResponse = {
    deleteTodo: {
      deletedId: todo.id,
      user: {
        id: user.id,
        countTodos: user.countTodos - 1,
        countTodosComplete: todo.complete ? user.countTodosComplete - 1 : user.countTodosComplete,
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
        type: "NODE_DELETE",
        deletedIDFieldName: "deletedId",
      },
    ],
  });
}

export default deleteTodo;
