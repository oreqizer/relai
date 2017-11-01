/* @flow */
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import styled, { css } from "styled-components";
import type { RelayProp } from "react-relay";

import Input from "client/components/Input/index";
import type { TodoItem_item } from "./__generated__/TodoItem_item.graphql";
import type { UserInfo_info } from "../../__generated__/UserInfo_info.graphql";
import Toggle from "../Toggle/index";
import deleteTodo from "./mutations/deleteTodo";
import updateTodo from "./mutations/updateTodo";

const Li = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }

  ${props =>
    props.editing &&
    css`
      border-bottom: none;
      padding: 0;
    `};
`;

const EditInput = Input.extend`
  width: 507px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const Label = styled.label`
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;

  ${props =>
    props.complete &&
    css`
      color: #d9d9d9;
      text-decoration: line-through;
    `};
`;

const Destroy = styled.button`
  display: block;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  &:hover {
    color: #af5b5e;
  }

  &:after {
    content: "×";
  }
`;

type Props = {|
  user: UserInfo_info,
  item: TodoItem_item,
  relay: RelayProp,
|};

type State = {|
  editing: boolean,
  value: string,
|};

class TodoItem extends React.PureComponent<Props, State> {
  state = {
    editing: false,
    value: "",
  };

  input: ?HTMLInputElement;

  handleToggle = (ev: SyntheticEvent<HTMLInputElement>) => {
    const { item, user, relay: { environment } } = this.props;

    if (ev.target instanceof HTMLInputElement) {
      updateTodo(environment, user, item, {
        ...item,
        complete: ev.target.checked,
      });
    }
  };

  handleInitEdit = () => {
    this.setState({ value: this.props.item.text, editing: true }, () => {
      if (this.input) {
        this.input.focus();
      }
    });
  };

  handleChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.target instanceof HTMLInputElement) {
      this.setState({ value: ev.target.value });
    }
  };

  handleKeyDown = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      this.handleEdit(ev);
    }
  };

  handleEdit = (ev: SyntheticEvent<HTMLInputElement>) => {
    const { item, user, relay: { environment } } = this.props;

    if (ev.target instanceof HTMLInputElement) {
      const { value } = ev.target;
      if (value !== item.text) {
        updateTodo(environment, user, item, {
          ...item,
          text: value,
        });
      }

      this.setState({ editing: false });
    }
  };

  handleDestroy = () => {
    const { item, user, relay: { environment } } = this.props;

    deleteTodo(environment, user, item);
  };

  render() {
    const { item } = this.props;
    const { editing, value } = this.state;

    return (
      <Li editing={editing}>
        {editing ? (
          <EditInput
            id={item.id}
            value={value}
            innerRef={node => {
              this.input = node;
            }}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleEdit}
          />
        ) : (
          <div>
            <Toggle id={`${item.id}-toggle`} checked={item.complete} onChange={this.handleToggle} />
            <Label htmlFor={item.id} complete={item.complete} onClick={this.handleInitEdit}>
              {item.text}
            </Label>
            <Destroy onClick={this.handleDestroy} />
          </div>
        )}
      </Li>
    );
  }
}

export default createFragmentContainer(
  TodoItem,
  graphql`
    fragment TodoItem_item on Todo {
      id
      text
      complete
    }
  `,
);
