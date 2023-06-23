import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, SectionTitle, Card } from '../../../components';
import { Button } from '../../../ui';
import { api } from '../../../api';
import { Link, useNavigate } from 'react-router-dom';

export const News = () => {
  const [data, setData] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    api('announcement/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <Root>
      <SectionTitle>{t('news')}</SectionTitle>
      <Button
        style={{ marginLeft: window.innerWidth >= 700 ? 'auto' : 0 }}
        onClick={() => navigate('/news/?page=1&page_size=10')}
      >
        {t('allNews')}
      </Button>
      <Grid>
        {data &&
          data.results.slice(0, 6).map(item => (
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
