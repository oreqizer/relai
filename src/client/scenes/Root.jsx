/* @flow */
import * as React from "react";
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

type State = {
  mounted: boolean,
};

class Root extends React.Component<{}, State> {
  state = { mounted: false };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
  }

  render() {
    const { mounted } = this.state;

    if (!mounted) {
      return <div>Loading</div>;
    }

    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query RootQuery($author: String!) {
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
  }
}

export default Root;
