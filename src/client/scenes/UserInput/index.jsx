/* @flow */
import * as React from "react";

import Input from "client/components/Input";
import Title from "client/components/Title";

type Props = {|
  value: string,
  onChange: string => any,
  onSwitchView: () => any,
|};

class UserInput extends React.PureComponent<Props> {
  handleChange = ev => {
    this.props.onChange(ev.target.value);
  };

  handleKeyPress = ev => {
    if (ev.key === "Enter") {
      this.props.onSwitchView();
    }
  };

  render() {
    const { value } = this.props;

    return (
      <div>
        <Title>user</Title>
        <Input value={value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}

export default UserInput;
