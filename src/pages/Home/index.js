import React from 'react';
import styled from 'styled-components';
import { Banner, Gallery, News, Partners } from './components';
import blob from '../../images/blobFilled.svg';
import { Helmet } from 'react-helmet';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>KOREAN EDUCATION CENTER IN BISHKEK</title>
      </Helmet>
      <Banner />
      <div style={{ position: 'relative' }}>
        <Blob src={blob} />
        <Blob src={blob} />
        <Blob src={blob} />
        <News />
        <Gallery />
      </div>
      <Partners />
    </>
  );
};

const Blob = styled.img`
  height: clamp(180px, 30vw, 500px);
  display: block;
  position: absolute;
  z-index: -1;

  &:nth-child(2n + 1) {
    transform: rotate(180deg);
    right: 0;
  }

  &:nth-child(2n + 2) {
    left: 0;
  }

  &:first-child {
    top: 0;
  }

  &:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }

  &:nth-child(3) {
    transform: rotate(0deg);
    right: -5%;
    bottom: -20%;

    @media (max-width: 1024px) {
      bottom: 0;
    }
  }
`;
