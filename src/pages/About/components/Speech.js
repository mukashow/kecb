import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SectionTitle } from '../../../components';
import blob from '../../../images/blobFilled.svg';
import { api } from '../../../api';

export const Speech = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api('speech/')
      .then(({ data }) => setData(data[0]))
      .catch(console.log);
  }, []);

  console.log(data);

  return (
    <Root>
      <div>
        <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
          {data?.title}
        </SectionTitle>
        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
      </div>
      <Picture>
        <img src={data?.image} />
        <img src={blob} alt="" />
        <img src={blob} alt="" />
      </Picture>
    </Root>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 7fr 3.8fr;
  gap: clamp(50px, 10vw, 130px);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

    & > div:first-child svg {
      display: none;
    }
  }
`;

const Picture = styled.div`
  position: relative;

  img:first-child {
    display: block;
    width: 100%;
    border-radius: 20px;
    height: clamp(350px, 40vw, 450px);
    object-fit: cover;
  }

  img:nth-child(2) {
    position: absolute;
    bottom: -15%;
    left: -25%;
    height: clamp(250px, 30vw, 350px);
    z-index: -1;
  }

  img:nth-child(3) {
    position: absolute;
    top: -15%;
    right: -25%;
    height: clamp(250px, 30vw, 350px);
    transform: rotate(180deg);
    z-index: -1;
  }
`;
