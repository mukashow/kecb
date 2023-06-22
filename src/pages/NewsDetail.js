import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from '../components';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Text } from '../ui';

export const NewsDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api(`announcement/${id}/`)
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <>
      <Root>
        <SectionTitle mb={14}>{data?.title}</SectionTitle>
        <Head>
          <Text>{data?.type}</Text>
          {data && <Text>{new Date(data.data).toLocaleDateString()}</Text>}
        </Head>
        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
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
