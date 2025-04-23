import React from "react";
import styled from "styled-components";

const ArticleContainer = styled.article`
  font-family: 'Times New Roman', sans-serif;
`;

const ArticleTitle = styled.h2`
  color: rgb(94, 11, 0);
`;

const ArticleText = styled.p``;

function Article({ title, content }) {
  return (
    <ArticleContainer>
      <ArticleTitle>{title}</ArticleTitle>
      <ArticleText>{content}</ArticleText>
    </ArticleContainer>
  );
}

export default Article;
