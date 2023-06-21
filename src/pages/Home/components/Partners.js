import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../components';
import img from '../../../images/image.svg';
import img1 from '../../../images/blobFilled.svg';

export const Partners = () => {
  return (
    <Root>
      <Slider>
        <Slide src={img} />
        <Slide src={img} />
        <Slide src={img1} />
        <Slide src={img1} />
        <Slide src={img1} />
        <Slide src={img1} />
        <Slide src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" />
      </Slider>
    </Root>
  );
};

const Slider = styled(Container)`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
`;

const Slide = styled.img`
  display: block;
  width: 170px;
  object-fit: contain;
  flex-shrink: 0;

  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const Root = styled.div`
  background: rgba(1, 64, 154, 0.06);
  padding: clamp(90px, 10vw, 130px) 0;
`;
