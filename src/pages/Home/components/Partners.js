import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../../components';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';

export const Partners = () => {
  const [data, setData] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    api('partners/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <Root>
      <Slider>
        {data.map(({ id, image, link }) => (
          <Slide href={link} target="_blank" key={id}>
            <img src={image} alt="" />
          </Slide>
        ))}
      </Slider>
    </Root>
  );
};

const Slider = styled(Container)`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  align-items: center;
`;

const Slide = styled.a`
  display: block;
  width: 170px;

  flex-shrink: 0;

  &:not(:last-child) {
    margin-right: 40px;
  }

  img {
    object-fit: contain;
    display: block;
    width: 100%;
  }
`;

const Root = styled.div`
  background: rgba(1, 64, 154, 0.06);
  padding: clamp(90px, 10vw, 130px) 0;
`;
