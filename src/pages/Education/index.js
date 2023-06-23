import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container, Tabs } from '../../components';
import { Text } from '../../ui';
import blob from '../../images/blobFilled.svg';
import { Info, Table } from './components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

export const Education = () => {
  const banners = useSelector(state => state.main.banners);
  const banner = useMemo(() => {
    return banners.find(({ page }) => page === 'Обучение в Корее');
  }, [banners]);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('educInKorea')}</title>
      </Helmet>
      <Banner
        style={{
          backgroundImage: `url(${banner?.main_image})`,
        }}
      >
        <Container>
          <Text fz="clamp(32px, 4vw, 50px)" color="white" as="h1" fw={700}>
            {t('educInKorea')}
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
            { title: t('educInfo'), path: '/education/info' },
            { title: t('studentRecruitment'), path: '/education/announcement' },
          ]}
        />
        <Container style={{ paddingTop: 'clamp(40px, 5vw, 60px)' }}>
          {pathname === '/education/info' && <Info />}
          {pathname === '/education/announcement' && <Table />}
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
