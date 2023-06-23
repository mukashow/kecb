import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container, Tabs } from '../../components';
import { Text } from '../../ui';
import blob from '../../images/blobFilled.svg';
import { Gallery, Aids } from './components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const DataLibrary = () => {
  const banners = useSelector(state => state.main.banners);
  const banner = useMemo(() => {
    return banners.find(({ page }) => page === 'Библиотека данных');
  }, [banners]);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <Banner
        style={{
          backgroundImage: `url(${banner?.main_image})`,
        }}
      >
        <Container>
          <Text fz="clamp(32px, 4vw, 50px)" color="white" as="h1" fw={700}>
            {t('dataLibrary')}
          </Text>
        </Container>
      </Banner>
      <Content>
        <Blob src={blob} />
        <Blob
          src={blob}
          style={{
            bottom: 'auto',
            left: 'auto',
            transform: 'rotate(180deg)',
            right: 0,
            top: '15%',
          }}
        />
        <Tabs
          tabs={[
            { title: t('photoGallery'), path: '/library/gallery' },
            { title: t('trainingAids'), path: '/library/aids' },
          ]}
        />
        <Container style={{ paddingTop: 'clamp(40px, 5vw, 60px)' }}>
          {pathname === '/library/gallery' && <Gallery />}
          {pathname === '/library/aids' && <Aids />}
        </Container>
      </Content>
    </>
  );
};

const Banner = styled.div`
  height: clamp(290px, 30vw, 400px);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  position: relative;
  padding: clamp(60px, 7vw, 100px) 0;
`;

const Blob = styled.img`
  height: clamp(180px, 30vw, 500px);
  display: block;
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 1%;
`;
