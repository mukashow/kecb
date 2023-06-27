import React from 'react';
import styled from 'styled-components';

export const Container = React.forwardRef(({ children, className, style }, ref) => {
  return (
    <Root className={className} style={style} ref={ref}>
      {children}
    </Root>
  );
});

const Root = styled.div`
  max-width: 1230px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
`;
