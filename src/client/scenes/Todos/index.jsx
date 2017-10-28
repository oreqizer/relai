/* @flow */
/* @flow */
import React from "react";
import { QueryRenderer, graphql } from "react-relay";

import Input from "client/components/Input";
import Title from "client/components/Title";
import environment from "./services/environment";

type Props = {|
  user: string,
  onChange: string => any,
  onSwitchView: () => any,
|};

const Todos = (props: Props) => (
  <div>
    <Title>todos</Title>
    <QueryRenderer
      environment={environment}
      query={graphql`
        query TodosQuery($user: String!) {
          getTodos(author: $user) {
            id
            text
            complete
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
          return <div>TODOS</div>;
        }

        return null;
      }}
    />
  </div>
);

export default Todos;
