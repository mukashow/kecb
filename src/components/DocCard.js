import React from 'react';
import styled from 'styled-components';
import { Icon } from '../ui';

export const DocCard = ({ title }) => {
  return (
    <Root>
      <Icon id="cloud" />
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
