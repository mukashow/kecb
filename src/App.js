import { createGlobalStyle } from 'styled-components';
import { Header } from './components';

export const App = () => {
  return (
    <>
      <Header />
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
