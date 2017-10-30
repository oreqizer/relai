/* @flow */
import * as React from "react";
import styled from "styled-components";

const Label = styled.label`
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
`;

const Checkbox = styled.input`
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
`;

type Props = {|
  id: string,
  checked: boolean,
  onChange: (SyntheticEvent<HTMLInputElement>) => any,
|};

const Toggle = (props: Props) => (
  <Label htmlFor={props.id}>
    <Checkbox id={props.id} checked={props.checked} onChange={props.onChange} />
  </Label>
);

export default Toggle;
