import React from 'react';
import styled from 'styled-components';
import { Icon } from '../ui';

export const Pagination = () => {
  return (
    <Root>
      <div aria-disabled>
        <Icon id="paginationArrow" />
      </div>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <div style={{ transform: 'rotate(180deg)' }}>
        <Icon id="paginationArrow" />
      </div>
    </Root>
  );
};

const Root = styled.div`
  background: #eaecf0;
  border: 0.624204px solid #e7edfb;
  border-radius: 7.49044px;
  display: flex;
  margin-left: auto;
  width: max-content;
  overflow: hidden;

  @media (max-width: 640px) {
    margin: 0 auto;
  }

  & > * {
    height: 40px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0c2044;

    svg {
      width: 14px;
    }

    &[aria-disabled] {
      color: #a6a6a6;
      pointer-events: none;
    }

    &:not([aria-disabled]):hover {
      background: #004098;
      color: white;
      cursor: pointer;
    }
  }
`;
