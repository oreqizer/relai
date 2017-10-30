/* @flow */
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import styled, { css } from "styled-components";

import Input from "client/components/Input";
import type { TodoItem_item } from "./__generated__/TodoItem_item.graphql";
import Toggle from "../Toggle";

const Li = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }
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
  item: TodoItem_item,
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

  handleToggle = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.target instanceof HTMLInputElement) {
      // TODO toggle complete
    }
  };

  handleInitEdit = () => {
    this.setState({ value: this.props.item.text, editing: true });
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
    if (ev.target instanceof HTMLInputElement) {
      // TODO handle edit
      this.setState({ editing: false });
    }
  };

  handleDestroy = () => {
    // TODO handle destroy
  };

  render() {
    const { item } = this.props;
    const { editing, value } = this.state;

    return (
      <Li>
        {editing ? (
          <Input
            id={item.id}
            value={value}
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
            <Destroy onChange={this.handleToggle} />
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
