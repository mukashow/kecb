import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, PopupSlider, SectionTitle } from '../components';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Text } from '../ui';
import img from '../images/image.svg';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

export const GalleryDetail = () => {
  const [popupImages, setPopupImages] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    api(`photo_gallery/${id}/`)
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('photoGallery')}</title>
      </Helmet>
      <Root>
        <SectionTitle mb={14}>{data?.title}</SectionTitle>
        <Head>
          <Text>{data?.category}</Text>
          {data && <Text>{new Date(data.data).toLocaleDateString()}</Text>}
        </Head>
        <Content dangerouslySetInnerHTML={{ __html: data?.description }} />
        <Grid>
          {data?.photos.map(({ image, id }, index) => (
            <div
              key={id}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => {
                setPopupImages(data.photos.map(({ image }) => image));
                setActiveSlide(index);
              }}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </Grid>
      </Root>
      <PopupSlider
        activeSlide={activeSlide}
        images={popupImages}
        isOpen={!!popupImages.length}
        close={() => setPopupImages([])}
      />
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

const Content = styled.div`
  * {
    color: #4d5257;
    line-height: 150%;
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
    cursor: zoom-in;
  }

  img {
    visibility: hidden;

    @media (max-width: 420px) {
      height: 250px;
    }
  }
`;
