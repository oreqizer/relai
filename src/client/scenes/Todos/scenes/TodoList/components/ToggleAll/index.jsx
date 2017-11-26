/* @flow */
import * as React from "react";
import styled from "styled-components";

const Checkbox = styled.input`
  text-align: center;
  border: none;
  opacity: 0;
  position: absolute;
`;

const Label = styled.label`
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);

  &:before {
    content: "❯";
    font-size: 22px;
    color: ${props => (props.checked ? "#737373" : "#e6e6e6")};
    padding: 10px 27px 10px 27px;
  }
`;

type Props = {|
  checked: boolean,
  onChange: (SyntheticEvent<HTMLInputElement>) => any,
|};

const ToggleAll = (props: Props) => (
  <Label
    htmlFor="toggleAll"
    checked={props.checked}
    data-creepx={JSON.stringify({ action: "toggle all" })}
  >
    <Checkbox id="toggleAll" type="checkbox" checked={props.checked} onChange={props.onChange} />
  </Label>
);

export default ToggleAll;
