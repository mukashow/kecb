import React from 'react';
import styled, { css } from 'styled-components';
import img from '../images/image.svg';
import { Icon, Text } from '../ui';

export const Card = ({
  title,
  description,
  type,
  date,
  direction = 'row',
  subtitle,
  image,
  history,
  arrow,
  className,
}) => {
  return (
    <Root $direction={direction} className={className}>
      <div>
        <img src={img} />
        <img src={image} />
      </div>
      <Content>
        <Text
          fz="clamp(16px, 2vw, 18px)"
          mb={direction === 'row' ? 4 : 12}
          color="#0C101A"
          fw={700}
        >
          {title}
        </Text>
        {subtitle && (
          <Text fz="clamp(14px, 2vw, 16px)" lh="24px" mb={19}>
            {subtitle}
          </Text>
        )}
        <Text
          fz={14}
          lh="24px"
          fw={direction === 'column' || history ? 300 : 400}
          {...(history && { color: '#4D5257' })}
        >
          {description}
        </Text>
        {type && (
          <Text fz={12} lh="24px" mt={10}>
            {type}
          </Text>
        )}
        {date && (
          <Text fz={12} lh="24px">
            {date}
          </Text>
        )}
        {arrow && <Icon id="arrowRight" />}
      </Content>
    </Root>
  );
};

const Root = styled.div`
  background: #ffffff;
  box-shadow: 0 2px 15px rgba(0, 64, 152, 0.1);
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  position: relative;

  & > div:first-child {
    position: relative;
  }

  img {
    height: 100%;
    display: block;
    object-fit: cover;
    flex-shrink: 2;
    background: #e5edf4;

    &:first-child {
      width: 178px;
    }

    &:nth-child(2) {
      position: absolute;
      inset: 0;
      width: 100%;
    }
  }

  ${({ $direction }) =>
    $direction === 'column' &&
    css`
      flex-direction: column;
    `};

  @media (max-width: 800px) {
    flex-direction: column;

    img {
      height: 150px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  padding: clamp(15px, 2vw, 20px);
  color: #4d5257;
  width: 100%;

  svg {
    position: absolute;
    bottom: 24px;
    right: 24px;
  }
`;