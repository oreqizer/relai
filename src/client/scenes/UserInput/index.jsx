/* @flow */
import * as React from "react";

import Input from "client/components/Input";
import Footer from "client/components/Footer";
import Title from "client/components/Title";

type Props = {|
  value: string,
  onChange: string => any,
  onSwitchView: () => any,
|};

class UserInput extends React.PureComponent<Props> {
  handleChange = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.target instanceof HTMLInputElement) {
      this.props.onChange(ev.target.value);
    }
  };

  handleKeyPress = (ev: SyntheticEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      this.props.onSwitchView();
    }
  };

  render() {
    const { value } = this.props;

    return (
      <div>
        <Title>user</Title>
        <Input
          value={value}
          placeholder="Your username"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <Footer />
      </div>
    );
  }
}

export default UserInput;
