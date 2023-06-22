import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { SectionTitle } from '../../../components';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';

export const Course = () => {
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    api(pathname === '/courses/course' ? 'informationaboutcenter/' : 'informationclasse/')
      .then(({ data }) => setData(data[0]))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        {pathname === '/courses/course' ? t('courseInfo') : t('lessonInfo')}
      </SectionTitle>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        <Images>
          <div>
            <img src={data?.main_image} alt="" />
          </div>
          <div>
            <img src={data?.image2} alt="" />
          </div>
          <div>
            <img src={data?.image3} alt="" />
          </div>
        </Images>
      </Content>
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: clamp(280px, 40vw, 500px);
  gap: clamp(12px, 2vw, 20px);

  div {
    position: relative;
  }

  & > div {
    &:first-child {
      grid-row: span 5;

      img {
        margin-bottom: -30px;
      }
    }

    &:nth-child(2) {
      grid-row: span 3;
    }

    &:nth-child(3) {
      grid-row: span 2;
    }
  }

  img {
    box-shadow: 4px 10px 30px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
  }
`;
