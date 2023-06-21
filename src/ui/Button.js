import React from 'react';
import styled from 'styled-components';

export const Button = ({ children, style, as = 'button' }) => {
  return (
    <Root style={style} as={as}>
      {children}
    </Root>
  );
};

const Root = styled.button`
  height: clamp(40px, 4vw, 49px);
  border-radius: 30px;
  background: #004098;
  border: 1px solid #004098;
  font-size: clamp(14px, 2vw, 16px);
  color: white;
  padding: 0 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #103a73;
  }
`;
