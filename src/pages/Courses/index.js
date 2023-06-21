import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Container, Tabs } from '../../components';
import { Text } from '../../ui';
import blob from '../../images/blobFilled.svg';
import { Course, Material } from './components';

export const Courses = () => {
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
            Курсы центра
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
            { title: 'Информация о курсах центра', path: '/courses/course' },
            { title: 'Информация о занятиях', path: '/courses/lesson' },
            { title: 'Материалы для уроков', path: '/courses/material' },
          ]}
        />
        <Container style={{ paddingTop: 'clamp(40px, 5vw, 60px)' }}>
          {pathname === '/courses/course' && <Course />}
          {pathname === '/courses/lesson' && <Course />}
          {pathname === '/courses/material' && <Material />}
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