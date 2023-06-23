import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import {
  Container,
  SectionTitle,
  Card,
  Pagination as PaginationStyle,
  PopupSlider,
} from '../../../components';
import { Button } from '../../../ui';
import { api } from '../../../api';

export const Gallery = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupImages, setPopupImages] = useState([]);
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    api('photo_gallery/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <Root>
      <SectionTitle>{t('gallery')}</SectionTitle>
      <Button as="a" style={{ marginLeft: window.innerWidth >= 700 ? 'auto' : 0 }}>
        {t('allGallery')}
      </Button>
      <Slider
        spaceBetween={15}
        slidesPerView={1}
        modules={[Pagination]}
        pagination
        breakpoints={{ 550: { slidesPerView: 2 }, 900: { slidesPerView: 3, spaceBetween: 30 } }}
      >
        {data.map(item => (
          <SwiperSlide
            key={item.id}
            onClick={() => {
              if (!!item.photos.length) {
                setPopupOpen(true);
                setPopupImages(item.photos.map(({ image }) => image));
              }
            }}
          >
            <Card
              {...item}
              subtitle={item.category}
              direction="column"
              image={item.photos[0]?.image}
            />
          </SwiperSlide>
        ))}
      </Slider>
      <PopupSlider images={popupImages} isOpen={popupOpen} close={() => setPopupOpen(false)} />
    </Root>
  );
};

const Root = styled(Container)`
  margin: clamp(60px, 7vw, 100px) auto;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto;
  align-items: center;
  gap: clamp(10px, 3vw, 40px);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const Slider = styled(Swiper)`
  grid-column: span 2;
  width: calc(100% + 40px);
  padding: 20px 20px clamp(30px, 4vw, 60px);
  margin: 0 -20px;

  .swiper-slide {
    cursor: zoom-in;
  }

  @media (max-width: 700px) {
    grid-column: span 1;
    grid-area: 2/1;
    margin-bottom: 10px;
  }

  ${PaginationStyle}
`;
