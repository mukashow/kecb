import React from 'react';
import styled from 'styled-components';
import { Icon } from '../ui';

export const Spinner = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <SpinnerPath
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        className="spinner_ajPY"
      />
    </svg>
  );
};

export const DocCard = ({ title, iconId, loading }) => {
  return (
    <Root>
      {loading ? <Spinner /> : <Icon id={iconId || 'cloud'} />}
      {title}
    </Root>
  );
};

const Root = styled.div`
  background: #ffffff;
  box-shadow: 0 2px 15px rgba(0, 64, 152, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  color: #004098;
  font-size: clamp(16px, 2vw, 18px);
  padding: clamp(20px, 2vw, 28px);

  svg {
    margin-right: 15px;
    width: clamp(40px, 4vw, 44px);
    height: clamp(40px, 4vw, 44px);
  }
`;

const SpinnerPath = styled.path`
  transform-origin: center;
  animation: spinner 0.75s infinite linear;
  fill: #004098;

  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
