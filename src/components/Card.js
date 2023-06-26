import React from 'react';
import styled, { css } from 'styled-components';
import img from '../images/image.svg';
import { Icon, Text } from '../ui';

export const Card = ({
  title,
  titleColor,
  description,
  short_description,
  limitDescription = true,
  type,
  data,
  direction = 'row',
  subtitle,
  image,
  history,
  arrow,
  className,
  list,
  onImageClick,
  onContentClick,
}) => {
  return (
    <Root $direction={direction} className={className} $limitDescription={limitDescription}>
      <div onClick={onImageClick}>
        <img src={img} />
        {image && <img src={image} />}
      </div>
      <Content onClick={onContentClick} {...(onContentClick && { style: { cursor: 'pointer' } })}>
        {title && (
          <Text fz="clamp(16px, 2vw, 18px)" mb={4} color={titleColor || '#0C101A'} fw={700}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text fz="clamp(14px, 2vw, 16px)" lh="24px" mb={10}>
            {subtitle}
          </Text>
        )}
        {list && (
          <Ul>
            {list.map(li => (
              <li key={li}>{li}</li>
            ))}
          </Ul>
        )}
        <Text
          fz={14}
          lh="24px"
          fw={direction === 'column' || history ? 300 : 400}
          {...(history && { color: '#4D5257' })}
        >
          <span dangerouslySetInnerHTML={{ __html: short_description || description }} />
        </Text>
        {type && (
          <Text fz={12} lh="24px" mt={10} color="#4D5257">
            {type}
          </Text>
        )}
        {data && (
          <Text fz={12} lh="24px" color="#4D5257">
            {new Date(data).toLocaleDateString()}
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

  ${({ $limitDescription }) =>
    $limitDescription &&
    css`
      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `}
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

const Ul = styled.ul`
  font-weight: 300;
  font-size: clamp(14px, 1vw, 16px);
  line-height: 24px;
  padding-left: 11px;
`;
