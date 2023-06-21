import React from 'react';
import styled from 'styled-components';

export const Container = ({ children, className, style }) => {
  return (
    <Root className={className} style={style}>
      {children}
    </Root>
  );
};

const Root = styled.div`
  max-width: 1230px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
`;
