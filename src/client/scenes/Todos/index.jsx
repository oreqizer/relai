/* @flow */
import React from "react";
import { QueryRenderer, graphql } from "react-relay";

import Title from "client/components/Title";
import TodoList from "./scenes/TodoList";
import environment from "./services/environment";

type Props = {|
  user: string,
|};

type State = {|
  show: "all" | "active" | "complete",
|};

function getFilter(hash) {
  const value = hash.slice(1);
  switch (value) {
    case "active":
      return "active";
    case "complete":
      return "complete";
    default:
      return "all";
  }
}

class Todos extends React.Component<Props, State> {
  state = { show: getFilter(window.location.hash) };

  componentDidMount() {
    window.addEventListener("hashchange", this.updateFilter);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.updateFilter);
  }

  updateFilter = () => {
    this.setState({ show: getFilter(window.location.hash) });
  };

  render() {
    const { user } = this.props;
    const { show } = this.state;

    return (
      <div>
        <Title>todos</Title>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query TodosQuery($user: String!) {
              user(name: $user) {
                ...TodoList_info
              }
            }
          `}
          variables={{ user, show }}
          render={res => {
            if (res.error) {
              // TODO proper error
              return <h2>{res.error.message}</h2>;
            }

            if (res.props) {
              return <TodoList info={res.props.user} show={show} />;
            }

            return null;
          }}
        />
      </div>
    );
  }
}

export default Todos;
