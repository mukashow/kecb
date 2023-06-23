import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, SectionTitle } from '../../../components';
import { api } from '../../../api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Gallery = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    api('photo_gallery/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        {t('photoGallery')}
      </SectionTitle>
      <Grid>
        {data.map(item => (
          <Link key={item.id} to={`/gallery/${item.id}`} style={{ textDecoration: 'none' }}>
            <Card {...item} subtitle={item.category} direction="column" />
          </Link>
        ))}
      </Grid>
    </Root>
  );
};

const Root = styled.div`
  @media (max-width: 640px) {
    & > div:first-child svg {
      display: none;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);
`;
