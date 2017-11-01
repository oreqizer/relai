/* @flow */
import * as React from "react";
import styled from "styled-components";

const Container = styled.span`
  float: left;
  text-align: left;
`;

const Strong = styled.strong`
  font-weight: 300;
`;

type Props = {|
  children: number,
|};

const TodoCount = (props: Props) => (
  <Container>
    <Strong>{props.children}</Strong>
    {" items left"}
  </Container>
);

export default TodoCount;
