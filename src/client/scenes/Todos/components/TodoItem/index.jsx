/* @flow */
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";

import type { TodoItem_item } from "./__generated__/TodoItem_item.graphql";

type Props = {|
  item: TodoItem_item,
|};

class TodoItem extends React.PureComponent<Props> {
  render() {
    const { item } = this.props;

    console.log("TodoItem:", item);
    return <li>{item.text}</li>;
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
