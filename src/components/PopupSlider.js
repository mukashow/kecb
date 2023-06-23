import React from 'react';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import '../index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination as PaginationStyle, Navigation as NavigationStyle } from './Swiper';
import { Icon } from '../ui';

export const PopupSlider = ({ images, isOpen, close }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={close}
      closeTimeoutMS={200}
      style={{
        overlay: {
          background: 'rgba(22, 43, 71, 0.35)',
          zIndex: 1000,
        },
        content: {
          inset: 'auto',
          position: 'relative',
          background: 'transparent',
          border: 'none',
          padding: 0,
          width: '100%',
          maxWidth: 1050,
          overflow: 'visible',
          maxHeight: 'clamp(250px, 50vw, 650px)',
          height: '100%',
        },
      }}
    >
      <Close onClick={close}>
        <Icon id="close" />
      </Close>
      <Slider
        modules={[Pagination, Navigation]}
        pagination={{ el: '.slider-pagination' }}
        navigation={{ nextEl: '.slider-next', prevEl: '.slider-prev' }}
        spaceBetween={15}
      >
        {images.map(image => (
          <SwiperSlide key={image} style={{ backgroundImage: `url(${image})` }} />
        ))}
      </Slider>
      <SliderPagination className="slider-pagination swiper-pagination" />
      <NavigationArrow className="slider-prev">
        <Icon id="arrow" />
      </NavigationArrow>
      <NavigationArrow className="slider-next">
        <Icon id="arrow" />
      </NavigationArrow>
    </ReactModal>
  );
};

const Slider = styled(Swiper)`
  max-width: 1050px;
  width: 100%;
  height: 100%;

  .swiper-slide {
    border-radius: 20px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Close = styled.div`
  background: #ffffff;
  border-radius: 50%;
  width: clamp(32px, 4vw, 48px);
  height: clamp(32px, 4vw, 48px);
  color: #004098;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;

  svg {
    width: clamp(24px, 4vw, 56px);
    height: clamp(24px, 4vw, 56px);
  }
`;

const SliderPagination = styled.div`
  ${PaginationStyle};
  bottom: -38px !important;

  @media (max-width: 1024px) {
    bottom: -20px !important;
  }

  .swiper-pagination-bullet {
    background: white !important;
    opacity: 0.9 !important;
    max-width: clamp(46px, 6vw, 77px) !important;
    margin: 0 clamp(7px, 2vw, 15px) !important;

    &.swiper-pagination-bullet-active {
      background: #004098 !important;
    }
  }
`;

const NavigationArrow = styled.div`
  ${NavigationStyle}

  &.slider-next {
    right: -40px;

    @media (max-width: 1200px) {
      right: -15px;
    }
  }

  &.slider-prev {
    svg {
      transform: rotate(180deg);
    }

    left: -40px;

    @media (max-width: 1200px) {
      left: -15px;
    }
  }

  svg {
    height: clamp(15px, 2vw, 25px);
  }
`;
