/* @flow */
import * as React from "react";
import styled from "styled-components";

import Input from "client/components/Input";
import TodoItem from "../TodoItem";
import type { TodoItem_item } from "../TodoItem/__generated__/TodoItem_item.graphql";

const Section = styled.section`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const NewTodoInput = Input.extend`
  &::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  &::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }

  &::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;

type Props = {|
  todos: TodoItem_item[],
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

  render() {
    const { value } = this.state;
    const { todos } = this.props;

    return (
      <Section>
        <header>
          <NewTodoInput value={value} onChange={this.handleChange} />
          {todos.map(item => <TodoItem key={item.id} item={item} />)}
        </header>
      </Section>
    );
  }
}
