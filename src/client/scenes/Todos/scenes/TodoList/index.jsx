/* @flow */
import * as React from "react";
import styled from "styled-components";
import { createFragmentContainer, graphql } from "react-relay";
import type { RelayProp } from "react-relay";

import Input from "client/components/Input";
import Footer from "client/components/Footer";
import type { TodoList_info } from "./__generated__/TodoList_info.graphql";
import TodoItem from "./components/TodoItem";
import ToggleAll from "./components/ToggleAll";
import TodoCount from "./components/TodoCount";
import Filters from "./components/Filters";
import createTodo from "./mutations/createTodo";
import markTodosComplete from "./mutations/markTodosComplete";

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
  info: TodoList_info,
  relay: RelayProp,
|};

type State = {|
  value: string,
|};

class TodoList extends React.PureComponent<Props, State> {
  state = { value: "" };

  handleChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.target instanceof HTMLInputElement) {
      this.setState({ value: ev.target.value });
    }
  };

  handleKeyPress = (ev: SyntheticEvent<HTMLInputElement>) => {
    const { info, relay: { environment } } = this.props;

    if (ev.key === "Enter" && ev.target instanceof HTMLInputElement) {
      createTodo(environment, info, ev.target.value);
      this.setState({ value: "" });
    }
  };

  handleToggleAll = (ev: SyntheticEvent<HTMLInputElement>) => {
    const { info, relay: { environment } } = this.props;

    if (ev.target instanceof HTMLInputElement) {
      markTodosComplete(environment, info, ev.target.checked);
    }
  };

  render() {
    const { value } = this.state;
    const { info } = this.props;

    if (!info.todos || !info.todos.edges) {
      return null;
    }

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
            <ToggleAll
              checked={info.countTodos > 0 && info.countTodos === info.countTodosComplete}
              onChange={this.handleToggleAll}
            />
            <Ul>
              {info.todos.edges
                .filter(Boolean)
                .map(({ node }) => node && <TodoItem key={node.id} item={node} user={info} />)}
            </Ul>
          </Main>
        </header>
        {info.countTodos > 0 && (
          <Footer>
            <TodoCount>{info.countTodos - info.countTodosComplete}</TodoCount>
            <Filters />
          </Footer>
        )}
      </Section>
    );
  }
}

export default createFragmentContainer(
  TodoList,
  graphql`
    fragment TodoList_info on User {
      id
      countTodos
      countTodosComplete
      todos(
        first: 10000000 # A random big number
        show: $show
      ) @connection(key: "TodoList_todos", filters: []) {
        edges {
          node {
            id
            complete
            ...TodoItem_item
          }
        }
      }
    }
  `,
);
