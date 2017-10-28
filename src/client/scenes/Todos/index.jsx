/* @flow */
/* @flow */
import React from "react";
import { QueryRenderer, graphql } from "react-relay";

import Title from "client/components/Title";
import TodoItem from "./components/TodoItem";
import environment from "./services/environment";

type Props = {|
  user: string,
|};

const Todos = (props: Props) => (
  <div>
    <Title>todos</Title>
    <QueryRenderer
      environment={environment}
      query={graphql`
        query TodosQuery($user: String!) {
          todos(author: $user) {
            ...TodoItem_item
          }
        }
      `}
      variables={{ user: props.user }}
      render={res => {
        if (res.error) {
          // TODO proper error
          return <h2>{res.error.message}</h2>;
        }

        if (res.props) {
          return res.props.todos.map(todo => <TodoItem key={todo.id} item={todo} />);
        }

        return null;
      }}
    />
  </div>
);

export default Todos;
