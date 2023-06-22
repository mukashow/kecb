import React, { useEffect, useMemo, useState } from 'react';
import { Card, SectionTitle } from '../../../components';
import styled from 'styled-components';
import { api } from '../../../api';
import bubble from '../../../images/circleBubble.png';
import { useTranslation } from 'react-i18next';

export const History = () => {
  const [data, setData] = useState([]);
  const [cardHeight, setCardHeight] = useState({ first: 0, last: 0 });
  const { t } = useTranslation();

  const stickStyle = useMemo(() => {
    return {
      height: `calc(100% - ${(cardHeight.first + cardHeight.last) / 2}px)`,
      top: cardHeight.first / 2,
    };
  }, [cardHeight]);

  const onCardRef = (el, index, arr) => {
    if (el) {
      if (index === 0 && !cardHeight.first)
        setCardHeight({ ...cardHeight, first: el.clientHeight });
      if (index === arr.length - 1 && !cardHeight.last) {
        setCardHeight({ ...cardHeight, last: el.clientHeight });
      }
    }
  };

  useEffect(() => {
    api('history/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 2.5vw, 32px)" mb="clamp(20px, 3vw, 40px)">
        {t('centerInfo')}
      </SectionTitle>
      <div style={{ position: 'relative' }}>
        <Stick style={stickStyle} />
        <Grid>
          {data.map((item, index, arr) => (
            <HistoryCard key={item.id} $position={index + 1} ref={el => onCardRef(el, index, arr)}>
              <span>{new Date(item.data).toLocaleDateString()}</span>
              <Card description={item.description} history />
            </HistoryCard>
          ))}
        </Grid>
      </div>
    </Root>
  );
};

const Root = styled.div`
  & > div:first-child svg {
    @media (max-width: 640px) {
      display: none;
    }
  }
`;

const HistoryCard = styled.div`
  position: relative;

  & > span {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: clamp(16px, 2vw, 24px);
    color: #252525;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &::before {
      content: '';
      display: block;
      width: 44px;
      height: 44px;
      background: no-repeat center url(${bubble});
      background-size: contain;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &::after {
      content: '';
      display: block;
      background: #ccd9eb;
      height: 2px;
      width: clamp(60px, 9vw, 130px);
      margin-left: 6px;
    }

    @media (max-width: 600px) {
      top: auto;
      bottom: calc(100% + 10px);
      transform: none;
      right: auto !important;
      left: -40px !important;
      flex-direction: row-reverse !important;

      &::after {
        margin: 0;
      }
    }
  }

  &:not(:first-child) {
    margin-top: -127px;

    @media (max-width: 600px) {
      margin-top: 0;
    }
  }

  &:nth-child(2n + 1) {
    grid-area: ${({ $position }) => $position} / 2 / auto / auto;

    @media (max-width: 600px) {
      grid-area: unset;
    }

    & > span {
      right: 100%;

      &::before {
        right: 67px;

        @media (max-width: 1200px) {
          right: 19px;
        }

        @media (max-width: 600px) {
          right: auto;
          left: 0;
        }
      }
    }
  }

  &:nth-child(2n + 2) {
    grid-area: ${({ $position }) => $position} / 1 / auto / auto;

    @media (max-width: 600px) {
      grid-area: unset;
    }

    & > span {
      left: 100%;
      flex-direction: row-reverse;

      @media (max-width: 600px) {
        flex-direction: row;
      }

      &::before {
        left: 67px;

        @media (max-width: 1200px) {
          left: 19px;
        }

        @media (max-width: 600px) {
          left: 0;
          right: auto;
        }
      }

      &::after {
        margin: 0 6px 0 0;
      }
    }
  }
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: clamp(57px, 6.5vw, 87px);
  column-gap: 178px;
  align-items: start;

  @media (max-width: 1200px) {
    column-gap: 80px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding-left: 20px;
    margin-top: 55px;
  }
`;

const Stick = styled.span`
  background: #ccd9eb;
  width: 2px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 600px) {
    transform: none;
    left: 0;
    height: calc(100% + 10px) !important;
    top: -5px !important;
  }
`;
