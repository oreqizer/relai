/* @flow */
/* @flow */
import React from "react";
import styled from "styled-components";

import Input from "client/components/Input";
import Title from "client/components/Title";

type Props = {|
  user: string,
  onChange: string => any,
  onSwitchView: () => any,
|};

const UserInput = (props: Props) => (
  <div>
    <Title>todos</Title>
  </div>
);

export default UserInput;
