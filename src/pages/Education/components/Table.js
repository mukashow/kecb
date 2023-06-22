import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { SectionTitle } from '../../../components';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';

export const Table = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api('student_recruitment_announcements/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        {t('studentRecruitment')}
      </SectionTitle>
      <Grid>
        <Row $th>
          <div>{t('number')}</div>
          <div>{t('name')}</div>
          <div>{t('date')}</div>
        </Row>
        {data.map(({ title, id, data }, index) => (
          <Row key={id}>
            <div>{index + 1}</div>
            <div>{title}</div>
            <div>{new Date(data).toLocaleDateString()}</div>
          </Row>
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

const Row = styled.div`
  display: grid;
  grid-template-columns: clamp(60px, 8vw, 100px) 2fr 1fr;
  filter: drop-shadow(0px 2px 24px rgba(0, 64, 152, 0.1));
  background: #ffffff;
  border-radius: 10px;
  color: #0c2044;
  font-size: clamp(14px, 1.5vw, 16px);

  ${({ $th }) =>
    $th &&
    css`
      color: white;
      background: #004098;

      div {
        border-color: white;
      }
    `}

  & > div {
    padding: clamp(15px, 2vw, 25px) clamp(10px, 1.5vw, 15px);
    display: flex;
    align-items: center;

    &:first-child {
      justify-content: center;
    }

    &:nth-child(2) {
      border: 1px solid #c1cce7;
      border-top: none;
      border-bottom: none;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(8px, 1.5vw, 15px);
`;
