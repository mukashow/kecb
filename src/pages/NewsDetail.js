import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  Container,
  SectionTitle,
  Pagination as PaginationStyle,
  Navigation as NavigationStyle,
} from '../components';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Icon, Text } from '../ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import img from '../images/image.svg';
import { Pagination, Navigation } from 'swiper';
import blob from '../images/blobFilled.svg';
import JsFileDownloader from 'js-file-downloader';

export const NewsDetail = () => {
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
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
        <Files>
          {data?.files.map(file => (
            <File key={file.id} onClick={() => new JsFileDownloader({ url: file.file_url })}>
              <Icon id="cloud" />
              {file.title}
            </File>
          ))}
        </Files>
        <div
          style={{ position: 'relative' }}
          ref={el => {
            if (el) {
              setOffset(el.offsetLeft);
            }
          }}
        >
          <Slider
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 425: { slidesPerView: 'auto' } }}
            modules={[Pagination, Navigation]}
            pagination
            navigation={{ prevEl: '.slider-prev', nextEl: '.slider-next' }}
            $offset={offset}
          >
            {data?.images.map(({ id, image }) => (
              <SwiperSlide key={id} style={{ backgroundImage: `url(${image})` }}>
                <img src={img} style={{ visibility: 'hidden' }} />
              </SwiperSlide>
            ))}
          </Slider>
          <NavigationArrow className="slider-prev">
            <Icon id="arrow" />
          </NavigationArrow>
          <NavigationArrow className="slider-next">
            <Icon id="arrow" />
          </NavigationArrow>
        </div>
      </Root>
      <Blob src={blob} />
      <Blob
        src={blob}
        style={{
          bottom: 'auto',
          left: 'auto',
          transform: 'rotate(180deg)',
          right: 0,
          top: '15%',
        }}
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

const Blob = styled.img`
  height: clamp(180px, 30vw, 500px);
  display: block;
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 1%;
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

const Slider = styled(Swiper)`
  padding: 0 0 clamp(30px, 4vw, 60px) 0;
  ${({ $offset }) => css`
    margin: 0 -${$offset}px;
    padding-left: ${$offset}px;
    padding-right: 20px;
  `}

  .swiper-slide {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: auto;
    border-radius: 20px;

    img {
      display: block;
      height: clamp(200px, 27vw, 350px);
    }
  }

  ${PaginationStyle}
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

  display: none;

  @media (max-width: 425px) {
    display: flex;
  }
`;

const File = styled.div`
  padding: clamp(10px, 1.2vw, 15px) clamp(20px, 2.5vw, 30px);
  font-size: clamp(14px, 1.6vw, 18px);
  border-radius: 30px;
  background: #fff;
  box-shadow: 4px 10px 30px 0 rgba(0, 0, 0, 0.06);
  color: #004098;
  display: grid;
  grid-template-columns: auto auto;
  gap: 15px;
  align-items: center;
  cursor: pointer;
`;

const Files = styled.div`
  display: grid;
  gap: 24px;
  margin: clamp(30px, 4vw, 50px) 0 clamp(40px, 5vw, 60px);
  justify-content: start;
`;
