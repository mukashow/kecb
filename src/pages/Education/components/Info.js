import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, SectionTitle } from '../../../components';
import { api } from '../../../api';
import { Link } from 'react-router-dom';

export const Info = () => {
  const [data, setData] = useState([]);

  const list = (address, category, date) => {
    return [
      `Категория: ${category}`,
      `Адрес: ${address}`,
      `Дата создания: ${new Date(date).toLocaleDateString()}`,
    ];
  };

  useEffect(() => {
    api('education_korea/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        Информация о вузах
      </SectionTitle>
      <Grid>
        {data.map(item => (
          <Link key={item.id} to={`/education_info/${item.id}`} style={{ textDecoration: 'none' }}>
            <Card
              list={list(item.address, item.category, item.data)}
              image={item.icon}
              title={item.name}
              titleColor="#363636"
              arrow
            />
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
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;
