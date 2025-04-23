import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  color: rgb(175, 5, 5);
  padding: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
  border-radius: 10px;
  border: 1px solid rgb(94, 11, 0);
  font-family: 'Space Grotesk', sans-serif;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.9rem;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Title>Мой блог</Title>
    </HeaderWrapper>
  );
}

export default Header;
