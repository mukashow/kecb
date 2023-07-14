import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Container } from '../../../components';
import { Text } from '../../../ui';
import { useSelector } from 'react-redux';

export const Banner = () => {
  const banners = useSelector(state => state.main.banners);
  const data = useMemo(() => {
    return banners.find(({ page }) => page === 'Главная страница');
  }, [banners]);

  return (
    <Root style={{ backgroundImage: `url(${data?.main_image})` }}>
      <Container>
        <Text
          mb={24}
          fw={700}
          color="#004098"
          as="h1"
          fz="clamp(32px, 4vw, 50px)"
          style={{ maxWidth: 647 }}
        >
          {data?.title}
        </Text>
        <Text
          color="#252525"
          fw={700}
          as="p"
          lh="150%"
          fz="clamp(16px, 1.9vw, 22px)"
          style={{ maxWidth: 590 }}
        >
          {data?.description}
        </Text>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  height: 600px;
  padding-top: clamp(60px, 9vw, 110px);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
