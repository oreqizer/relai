/* @flow */
import * as React from "react";
import styled from "styled-components";

import Todos from "./Todos";
import UserInput from "./UserInput";

const Container = styled.div`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

type State = {
  user: string,
  viewTodos: boolean,
};

class Root extends React.Component<{}, State> {
  state = {
    user: "",
    viewTodos: false,
  };

  handleChange = user => {
    this.setState({ user });
  };

  handleSwitchView = () => {
    this.setState(state => ({ viewTodos: !state.viewTodos }));
  };

  render() {
    const { user, viewTodos } = this.state;

    return (
      <Container>
        {viewTodos ? (
          <Todos user={user} onSwitchView={this.handleSwitchView} />
        ) : (
          <UserInput
            user={user}
            onChange={this.handleChange}
            onSwitchView={this.handleSwitchView}
          />
        )}
      </Container>
    );
  }
}

export default Root;
