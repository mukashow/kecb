import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../components';
import { Icon, Text } from '../ui';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import blob from '../images/blobFilled.svg';
import { useOutsideClick } from '../hooks';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const QaItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));

  return (
    <Qa ref={ref}>
      <Item onClick={() => setOpen(!open)}>
        {question} <Icon id="arrowDown" />
      </Item>
      {open && <Item dangerouslySetInnerHTML={{ __html: answer }} />}
    </Qa>
  );
};

const filter = [
  { title: 'GKS', key: 'GKS' },
  { title: 'grants', key: 'Гранты для этнических корейцев' },
  { title: 'vacancies', key: 'Вакансии' },
  { title: 'koreanCourses', key: 'Курсы корейского' },
  { title: 'events', key: 'Мероприятия' },
  { title: 'TOPIK', key: 'TOPIK' },
  { title: 'another', key: 'Другое' },
];

export const QA = () => {
  const [data, setData] = useState([[], []]);
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const banners = useSelector(state => state.main.banners);
  const banner = useMemo(() => {
    return banners.find(({ page }) => page === 'Q&A');
  }, [banners]);

  useEffect(() => {
    api(`q_a/?${searchParams}`)
      .then(({ data }) => {
        setData([
          data.slice(0, Math.ceil(data.length / 2)),
          data.slice(Math.ceil(data.length / 2)),
        ]);
      })
      .catch(console.log);
  }, [i18n.language, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <title>Q&A</title>
      </Helmet>
      <Banner
        style={{
          backgroundImage: `url(${banner?.main_image})`,
        }}
      >
        <Container>
          <Text fz="clamp(32px, 4vw, 50px)" color="white" as="h1" fw={700}>
            Q&A
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
            <FilterBtn onClick={() => setSearchParams({})} $active={!searchParams.get('type')}>
              {t('total')}
            </FilterBtn>
            {filter.map(({ title, key }) => (
              <FilterBtn
                key={key}
                onClick={() => setSearchParams({ type: key })}
                $active={searchParams.get('type') === key}
              >
                {title === key ? title : t(title)}
              </FilterBtn>
            ))}
          </Filter>
          <GridWrap>
            <Grid>
              {data[0].map(qa => (
                <QaItem {...qa} key={qa.id} />
              ))}
            </Grid>
            <Grid>
              {data[1].map(qa => (
                <QaItem {...qa} key={qa.id} />
              ))}
            </Grid>
          </GridWrap>
        </Root>
      </div>
    </>
  );
};

const Root = styled(Container)`
  padding: clamp(70px, 8.5vw, 100px) 20px;
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;

const Grid = styled.div`
  display: grid;
  gap: clamp(20px, 2.5vw, 30px);
  align-content: start;
`;

const Banner = styled.div`
  height: clamp(290px, 30vw, 400px);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const FilterBtn = styled.div`
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
  cursor: pointer;

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
  padding-bottom: 40px;
`;

const Item = styled.div`
  padding: clamp(20px, 2.2vw, 24px) clamp(15px, 2.2vw, 30px);

  &:first-child {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &:last-child:not(:first-child) {
    font-size: 14px;
    color: rgba(3, 5, 34, 0.65);
    border-top: 1px solid #ccd9eb;
    line-height: 150%;
  }
`;

const Qa = styled.div`
  border-radius: 20px;
  background: #fff;
  color: #222;
  font-size: clamp(14px, 1.5vw, 16px);
  box-shadow: 0 -2px 24px 0 rgba(0, 64, 152, 0.1);

  svg {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: scale(1.3);
  }
`;
