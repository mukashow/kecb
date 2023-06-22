import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from '../components';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Text } from '../ui';
import img from '../images/image.svg';

export const GalleryDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api(`photo_gallery/${id}/`)
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <>
      <Root>
        <SectionTitle mb={14}>{data?.name}</SectionTitle>
        <Head>
          <Text>{data?.category}</Text>
          {data && <Text>{new Date(data.data).toLocaleDateString()}</Text>}
        </Head>
        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        <Grid>
          <div
            style={{
              backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZAq08u4YaR0Jsu2CgeptdxC74y-9QEeFYEAb6YHP&s)`,
            }}
          >
            <img src={img} alt="" />
          </div>
          <div
            style={{
              backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHZAq08u4YaR0Jsu2CgeptdxC74y-9QEeFYEAb6YHP&s)`,
            }}
          >
            <img src={img} alt="" />
          </div>
        </Grid>
      </Root>
    </>
  );
};

const Root = styled(Container)`
  padding: clamp(60px, 8vw, 100px) 20px;

  @media (max-width: 640px) {
    & > div:first-child svg {
      display: none;
    }
  }
`;

const Head = styled.div`
  font-size: clamp(14px, 2vw, 16px);
  color: #4d5257;
  font-weight: 300;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  gap: clamp(30px, 4vw, 60px);
  margin-bottom: clamp(20px, 3vw, 40px);
`;

const Grid = styled.div`
  padding-top: clamp(40px, 5vw, 60px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);

  div {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
  }

  img {
    visibility: hidden;

    @media (max-width: 420px) {
      height: 250px;
    }
  }
`;