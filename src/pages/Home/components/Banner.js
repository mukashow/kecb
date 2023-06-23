import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../../components';
import { Text } from '../../../ui';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';

export const Banner = () => {
  const [data, setData] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    api('main_banner/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <Root style={{ backgroundImage: `url(${data?.main_image})` }}>
      <Container>
        <Text
          mb={24}
          fw={700}
          color="#004098"
          as="h1"
          fz="clamp(32px, 3vw, 40px)"
          style={{ maxWidth: 647 }}
        >
          {data?.title}
        </Text>
        <Text
          color="#252525"
          as="p"
          lh="150%"
          fz="clamp(14px, 2vw, 16px)"
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
