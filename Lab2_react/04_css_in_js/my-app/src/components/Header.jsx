import styled from 'styled-components';

const Wrapper = styled.header`
    display: flex;
    color: $primary-color;
    padding: 0.5rem;
    justify-content: center;
    margin-bottom: 2rem;
    border-radius: 10px;
    border: 1px solid $primary-color;
    font-family: 'Space Grotesk', sans-serif;
`;

const HeaderTitle = styled.h1`
    margin: 0;
    font-size: 1.9rem;
`;

export default function Header() {
    return (
      <Wrapper>
        <HeaderTitle>Mini-Blog</HeaderTitle>
      </Wrapper>
    );
   }

