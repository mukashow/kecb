import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, SectionTitle } from '../components';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Text } from '../ui';
import { useTranslation } from 'react-i18next';

export const EducationDetail = () => {
  const [data, setData] = useState(null);
  const { i18n } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    api(`education_korea/${id}/`)
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <>
      <Root>
        <SectionTitle mb={14}>{data?.name}</SectionTitle>
        <Head>
          <Text>{data?.category}</Text>
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
