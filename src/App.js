import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  About,
  Courses,
  DataLibrary,
  Education,
  EducationDetail,
  GalleryDetail,
  Home,
  News,
  NewsDetail,
  QA,
} from './pages';
import { Footer, Header } from './components';
import { fetchBanners, fetchContacts } from './store/action';
import { useTranslation } from 'react-i18next';

export const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchBanners());
  }, [i18n.language]);

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
          <Route path="/library/gallery" element={<DataLibrary />} />
          <Route path="/library/aids" element={<DataLibrary />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/qa" element={<QA />} />
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
