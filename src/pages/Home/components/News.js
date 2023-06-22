import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, SectionTitle, Card } from '../../../components';
import { Button } from '../../../ui';
import { api } from '../../../api';
import { Link } from 'react-router-dom';

export const News = () => {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    api('announcement/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle>{t('news')}</SectionTitle>
      <Button as="a" style={{ marginLeft: window.innerWidth >= 700 ? 'auto' : 0 }}>
        {t('allNews')}
      </Button>
      <Grid>
        {data?.results.map(item => (
          <Link key={item.id} to={`/news/${item.id}`} style={{ textDecoration: 'none' }}>
            <Card {...item} />
          </Link>
        ))}
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
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
  grid-column: span 2;

  @media (max-width: 700px) {
    grid-column: span 1;
    grid-area: 2/1;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;
