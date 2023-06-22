import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { SectionTitle, Tabs } from '../../../components';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';

export const Activity = () => {
  const [data, setData] = useState([]);
  const { pathname } = useLocation();
  const current =
    pathname === '/about/activity/support'
      ? data.find(({ category }) => category === '2')
      : data.find(({ category }) => category === '1');
  const { t } = useTranslation();

  useEffect(() => {
    api('activity/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        Деятельность центра
      </SectionTitle>
      <TabWrap>
        <Tabs
          leftAlign={window.innerWidth > 1025}
          tabs={[
            { title: t('distributionKoreanLanguage'), path: '/about/activity/distribution' },
            {
              title: t('supportStudents'),
              path: '/about/activity/support',
            },
          ]}
        />
      </TabWrap>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: current?.content }} />
        <Images>
          <div>
            <img src={current?.main_image} alt="" />
          </div>
          <div>
            <img src={current?.image_first} alt="" />
          </div>
          <div>
            <img src={current?.image_second} alt="" />
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
  padding-top: 40px;
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

const TabWrap = styled.div`
  @media (max-width: 640px) {
    margin: 0 -16px;
  }
`;
