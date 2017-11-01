/* @flow */
import React from "react";
import { QueryRenderer, graphql } from "react-relay";

import Title from "client/components/Title";
import UserInfo from "./scenes/UserInfo";
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
          user(name: $user) {
            ...UserInfo_info
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
          return <UserInfo info={res.props.user} />;
        }

        return null;
      }}
    />
  </div>
);

export default Todos;
