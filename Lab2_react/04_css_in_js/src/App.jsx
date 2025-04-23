import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArticleList from "./components/ArticleList";
import styled from "styled-components";

const AppWrapper = styled.div`
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

function App() {
  return (
    <AppWrapper>
      <MainContent>
        <Header />
        <ArticleList />
        <Footer />
      </MainContent>
    </AppWrapper>
  );
}

export default App;
