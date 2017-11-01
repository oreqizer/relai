/* @flow */
import * as React from "react";
import styled, { css } from "styled-components";

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
`;

const Li = styled.li`
  display: inline;
`;

const Link = styled.a`
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  ${props =>
    props.selected &&
    css`
      border-color: rgba(175, 47, 47, 0.2);
    `};
`;

const Filters = () => (
  <Ul>
    <Li>
      <Link href="/#" selected={window.location.hash === ""}>
        All
      </Link>
      <Link href="/#active" selected={window.location.hash === "#active"}>
        Active
      </Link>
      <Link href="/#complete" selected={window.location.hash === "#complete"}>
        Complete
      </Link>
    </Li>
  </Ul>
);

export default Filters;
