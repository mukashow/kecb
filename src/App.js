import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { About, Courses, Education, EducationDetail, Home, News, NewsDetail } from './pages';
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
      <main style={{ position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/speech" element={<About />} />
          <Route path="/about/activity" element={<About />} />
          <Route path="/about/activity/distribution" element={<About />} />
          <Route path="/about/activity/support" element={<About />} />
          <Route path="/about/history" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/courses/course" element={<Courses />} />
          <Route path="/courses/lesson" element={<Courses />} />
          <Route path="/courses/material" element={<Courses />} />
          <Route path="/education/info" element={<Education />} />
          <Route path="/education/announcement" element={<Education />} />
          <Route path="/education_info/:id" element={<EducationDetail />} />
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
  overflow: hidden;

  main {
    flex-grow: 1;
  }
`;
