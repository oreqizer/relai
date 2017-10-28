/* @flow */
import React from "react";
import styled from "styled-components";

const Input = styled.input``;

type Props = {|
  user: string,
  onChange: string => any,
  onSwitchView: () => any,
|};

const UserInput = (props: Props) => <div>input</div>;

export default UserInput;
