import { createGlobalStyle } from 'styled-components';
import { Header } from './components';
import { Route, Routes } from 'react-router-dom';
import { About, Home } from './pages';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about_center/" element={<About />} />
      </Routes>
      <GlobalStyle />
    </>
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
