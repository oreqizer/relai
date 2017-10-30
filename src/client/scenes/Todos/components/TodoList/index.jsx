/* @flow */
import * as React from "react";
import styled from "styled-components";

import Input from "client/components/Input";
import TodoItem from "../TodoItem";
import ToggleAll from "../ToggleAll";
import type { TodoItem_item } from "../TodoItem/__generated__/TodoItem_item.graphql";

const Section = styled.section`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const NewTodoInput = Input.extend`
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`;

const Main = styled.section`
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

type Props = {|
  todos: TodoItem_item[],
  // TODO compute all checked
|};

type State = {|
  value: string,
|};

export default class TodoList extends React.PureComponent<Props, State> {
  state = { value: "" };

  handleChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.target instanceof HTMLInputElement) {
      this.setState({ value: ev.target.value });
    }
  };

  handleKeyPress = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      // TODO create todo
      this.setState({ value: "" });
    }
  };

  handleToggleAll = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.target instanceof HTMLInputElement) {
      // check/uncheck all
    }
  };

  render() {
    const { value } = this.state;
    const { todos } = this.props;

    return (
      <Section>
        <header>
          <NewTodoInput
            value={value}
            placeholder="What needs to be done?"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <Main>
            <ToggleAll checked={false} onChange={this.handleToggleAll} />
            <Ul>{todos.map(item => <TodoItem key={item.id} item={item} />)}</Ul>
          </Main>
        </header>
      </Section>
    );
  }
}
