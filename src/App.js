import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { About, Home } from './pages';
import { Footer, Header } from './components';
import { fetchContacts } from './store/action';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <Root>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about_center/" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <GlobalStyle />
    </Root>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Helvetica", sans-serif;
    outline: none;
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex-grow: 1;
  }
`;
