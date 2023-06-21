import React from 'react';
import styled from 'styled-components';

export const Text = ({ as = 'p', children, style, mb, color, fz, fw, lh, mt, ...props }) => {
  return (
    <Root
      as={as}
      style={{
        ...style,
        color,
        fontWeight: fw,
        fontSize: fz,
        marginBottom: mb,
        lineHeight: lh,
        marginTop: mt,
      }}
      {...props}
    >
      {children}
    </Root>
  );
};

const Root = styled.h1`
  color: #0c101a;
`;
