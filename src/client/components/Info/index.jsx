/* @flow */
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
`;

const Text = styled.p`
  line-height: 1;
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

const Info = () => (
  <Wrapper>
    <Text>
      Created by{" "}
      <Link href="https://github.com/oreqizer" target="_blank">
        oreqizer
      </Link>
    </Text>
    <Text>
      Code on{" "}
      <Link href="https://github.com/oreqizer/relai" target="_blank">
        GitHub
      </Link>
    </Text>
    <Text>
      CSS by{" "}
      <Link href="https://github.com/tastejs/todomvc-app-css" target="_blank">
        TodoMVC
      </Link>
    </Text>
  </Wrapper>
);

export default Info;
