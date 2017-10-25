/* @flow */
import React from "react";
import styled from "styled-components";
import { QueryRenderer, graphql } from "react-relay";

import environment from "../environment";
import { colors } from "../styles/variables";

const Div = styled.div`
  background: ${props => props.theme.colorPrimary};
`;

Div.defaultProps = {
  theme: {
    colorPrimary: colors.primary,
  },
};

const Root = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query ListTodos($author: String!) {
        getTodos(author: $author) {
          id
          text
          complete
        }
      }
    `}
    variables={{
      author: "dano",
    }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>;
      }
      if (props) {
        console.log(props);
        return <Div>Reactizer!</Div>;
      }
      return <div>Loading</div>;
    }}
  />
);

export default Root;
