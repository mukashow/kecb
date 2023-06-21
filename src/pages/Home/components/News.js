import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, SectionTitle, Card } from '../../../components';
import { Button } from '../../../ui';

export const News = () => {
  const { t } = useTranslation();

  return (
    <Root>
      <SectionTitle>{t('news')}</SectionTitle>
      <Button as="a" style={{ marginLeft: window.innerWidth >= 700 ? 'auto' : 0 }}>
        Все объявления
      </Button>
      <Grid>
        <Card
          title="Title"
          description="Lorem ipsum dolor sit amet adipcing amet adipcingamet adipci aqua lorem ipsum."
          type="Рубрика"
          date="20 января 2023"
          arrow
        />
        <Card
          title="Title"
          description="Lorem ipsum dolor sit amet adipcing amet adipcingamet adipci aqua lorem ipsum."
          type="Рубрика"
          date="20 января 2023"
          arrow
        />
      </Grid>
    </Root>
  );
};

const Root = styled(Container)`
  margin: clamp(60px, 7vw, 100px) auto;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  align-items: center;
  gap: clamp(30px, 4vw, 60px);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  grid-column: span 2;

  @media (max-width: 700px) {
    grid-column: span 1;
    grid-area: 2/1;
  }
`;
