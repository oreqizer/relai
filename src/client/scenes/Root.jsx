/* @flow */
import * as React from "react";
import styled from "styled-components";

import Info from "../components/Info";
import Todos from "./Todos";
import UserInput from "./UserInput";

const App = styled.section`
  background: #fff;
  margin: 150px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

type State = {
  user: string,
  viewTodos: boolean,
};

export default class Root extends React.Component<{}, State> {
  state = {
    user: "",
    viewTodos: false,
  };

  handleChange = (user: string) => {
    this.setState({ user });
  };

  handleSwitchView = () => {
    this.setState(state => ({ viewTodos: !state.viewTodos }));
  };

  render() {
    const { user, viewTodos } = this.state;

    return (
      <div>
        <App>
          {viewTodos ? (
            <Todos user={user} />
          ) : (
            <UserInput
              value={user}
              onChange={this.handleChange}
              onSwitchView={this.handleSwitchView}
            />
          )}
        </App>
        <Info />
      </div>
    );
  }
}
