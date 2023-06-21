import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocCard, SectionTitle } from '../../../components';
import { api } from '../../../api';

export const Material = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api('lessonmaterials/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        Материалы для уроков
      </SectionTitle>
      <Grid>
        {data.map(item => (
          <DocCard key={item.id} {...item} />
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
