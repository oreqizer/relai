/* @flow */
import React from "react";
import { QueryRenderer, graphql } from "react-relay";

import Title from "client/components/Title";
import TodoList from "./components/TodoList";
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
            ...TodoList_list
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
          console.log(res.props);
          return <TodoList todos={res.props.todos} user={props.user} />;
        }

        return null;
      }}
    />
  </div>
);

export default Todos;
