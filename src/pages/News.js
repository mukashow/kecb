import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { AppPagination, Card, Container } from '../components';
import { Text } from '../ui';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import blob from '../images/blobFilled.svg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const filter = [
  { title: 'GKS', key: 'GKS' },
  { title: 'TOPIK', key: 'TOPIK' },
  { title: 'koreanCourses', key: 'Курсы корейского языка' },
  { title: 'events', key: 'Мероприятия' },
  { title: 'vacancies', key: 'Вакансии' },
  { title: 'another', key: 'Другое' },
];

export const News = () => {
  const banners = useSelector(state => state.main.banners);
  const [searchParams, setSearchParams] = useSearchParams();
  const banner = useMemo(() => {
    return banners.find(({ page }) => page === 'Объявления');
  }, [banners]);
  const [data, setData] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    api(`announcement/?${searchParams}`)
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!searchParams.has('page') || !searchParams.has('page_size')) {
      setSearchParams({ page: 1, page_size: 10 });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('announcement')}</title>
      </Helmet>
      <Banner style={{ backgroundImage: `url(${banner?.main_image})` }}>
        <Container>
          <Text fz="clamp(32px, 4vw, 50px)" color="white" as="h1" fw={700}>
            {t('announcement')}
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
            <FilterBtn
              onClick={() => setSearchParams({ page: 1, page_size: 10 })}
              $active={!searchParams.get('type')}
            >
              {t('total')}
            </FilterBtn>
            {filter.map(({ title, key }) => (
              <FilterBtn
                key={key}
                onClick={() => setSearchParams({ page: 1, page_size: 10, type: key })}
                $active={searchParams.get('type') === key}
              >
                {title === key ? title : t(title)}
              </FilterBtn>
            ))}
          </Filter>
          <Grid>
            {data?.results.map(({ description, ...item }) => (
              <Link key={item.id} to={`/news/${item.id}/`} style={{ textDecoration: 'none' }}>
                <Card {...item} arrow />
              </Link>
            ))}
          </Grid>
          {data?.count ? <AppPagination count={data?.count} /> : null}
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
  padding-bottom: 30px;

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
  padding-bottom: clamp(40px, 4.5vw, 50px);
`;
