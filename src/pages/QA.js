import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../components';
import { Icon, Text } from '../ui';
import { Link } from 'react-router-dom';
import { api } from '../api';
import blob from '../images/blobFilled.svg';
import { useOutsideClick } from '../hooks';

const QaItem = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => setOpen(false));

  return (
    <Qa ref={ref}>
      <Item onClick={() => setOpen(!open)}>
        Сколько раз в год принимаете на курсы корейского языка? <Icon id="arrowDown" />
      </Item>
      {open && <Item>Сколько раз в год принимаете на курсы корейского языка?</Item>}
    </Qa>
  );
};

export const QA = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api('announcement/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <>
      <Banner
        style={{
          backgroundImage:
            'url(https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png)',
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
            <FilterBtn $active>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
            <FilterBtn>Общее</FilterBtn>
          </Filter>
          <GridWrap>
            <Grid>
              <QaItem />
              <QaItem />
            </Grid>
            <Grid>
              <QaItem />
              <QaItem />
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
  padding-top: 40px;
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

const FilterBtn = styled(Link)`
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
`;

const Item = styled.div`
  padding: clamp(20px, 2.2vw, 24px) clamp(15px, 2.2vw, 30px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    cursor: pointer;
  }

  &:last-child:not(:first-child) {
    font-size: 14px;
    color: rgba(3, 5, 34, 0.65);
    border-top: 1px solid #ccd9eb;
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
