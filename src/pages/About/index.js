import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container, Tabs } from '../../components';
import { Text } from '../../ui';
import blob from '../../images/blobFilled.svg';
import { History, Speech } from './components';

export const About = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Banner
        style={{
          backgroundImage:
            'url(https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png)',
        }}
      >
        <Container>
          <Text fz="clamp(32px, 4vw, 50px)" color="white" as="h1" fw={700}>
            О центре
          </Text>
        </Container>
      </Banner>
      <Content>
        <Blob src={blob} />
        <Tabs
          tabs={[
            { title: 'Приветственное слово директора', path: '/about/speech' },
            { title: 'История и основная информация центра', path: '/about/history' },
            { title: 'Деятельность центра', path: '/about/activity' },
          ]}
        />
        <Container style={{ paddingTop: 'clamp(40px, 5vw, 60px)' }}>
          {pathname === '/about/speech' && <Speech />}
          {pathname === '/about/history' && <History />}
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
  top: 10%;
`;
