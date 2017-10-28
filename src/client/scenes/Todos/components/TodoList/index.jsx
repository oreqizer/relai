/* @flow */
import * as React from "react";

import type { TodosQueryResponse } from "../../__generated__/TodosQuery.graphql";

type Props = {|
  todos: TodosQueryResponse.todos,
|};

export default class TodoList extends React.PureComponent<Props> {
  render() {
    const { todos } = this.props;

    console.log("TodoList:", todos);

    return todos.map(todo => (
      <div key={todo.id}>{todo.text}</div>
    ));
  }
}
