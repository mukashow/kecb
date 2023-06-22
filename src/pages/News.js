import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { AppPagination, Card, Container } from '../components';
import { Text } from '../ui';
import { Link } from 'react-router-dom';
import { api } from '../api';
import blob from '../images/blobFilled.svg';

export const News = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api('announcement/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

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
            Объявления
          </Text>
        </Container>
      </Banner>
      <div style={{ position: 'relative' }}>
        <Blob src={blob} />
        <Blob
          src={blob}
          style={{ bottom: 'auto', left: 'auto', top: 0, right: 0, transform: 'rotate(180deg)' }}
        />
        <Root>
          <Filter>
            <FilterBtn $active>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
          </Filter>
          <Grid>
            {data?.results.map(item => (
              <Link key={item.id} to={`/news/${item.id}/`} style={{ textDecoration: 'none' }}>
                <Card {...item} arrow />
              </Link>
            ))}
          </Grid>
          <AppPagination />
        </Root>
      </div>
    </>
  );
};

const Root = styled(Container)`
  padding: clamp(70px, 8.5vw, 100px) 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);
  padding: clamp(40px, 4.5vw, 50px) 0 30px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;

const Banner = styled.div`
  height: clamp(290px, 30vw, 400px);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const FilterBtn = styled(Link)`
  height: clamp(40px, 4.5vw, 50px);
  padding: 0 20px;
  border: 1px solid #004098;
  border-radius: 30px;
  color: #000000;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 7px 5px;

  &:hover {
    color: #004098;
  }

  ${({ $active }) =>
    $active &&
    css`
      background: #004098;
      color: white;

      &:hover {
        color: white;
      }
    `}
`;

const Blob = styled.img`
  height: clamp(180px, 30vw, 500px);
  display: block;
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 10px;
`;

const Filter = styled.div`
  display: flex;
  margin: -7px -5px;
  flex-wrap: wrap;
`;
