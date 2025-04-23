import React from "react";
import Article from "./Article";
import styled from "styled-components";

const ListWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

function ArticleList() {
  const articles = [
    { id: 1, title: "Первый пост", content: "Содержимое первого поста..." },
    { id: 2, title: "Второй пост", content: "Содержимое второго поста..." },
  ];

  return (
    <ListWrapper>
      {articles.map((article) => (
        <Article key={article.id} title={article.title} content={article.content} />
      ))}
    </ListWrapper>
  );
}

export default ArticleList;
