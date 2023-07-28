import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Icon } from '../ui';

export const Pagination = ({ count }) => {
  const pageCount = Math.ceil(count / 10);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = event => {
    searchParams.set('page', String(event.selected + 1));
    setSearchParams(searchParams);
  };

  return (
    <Root
      previousLabel={<Icon id="paginationArrow" />}
      nextLabel={
        <div style={{ transform: 'rotate(180deg)' }}>
          <Icon id="paginationArrow" />
        </div>
      }
      onPageChange={handlePageClick}
      forcePage={+searchParams.get('page') - 1}
      marginPagesDisplayed={1}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      activeClassName="active"
      disabledClassName="disabled"
    />
  );
};

const Root = styled(ReactPaginate)`
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
    position: relative;

    a {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:last-child,
    &:first-child {
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    @media (max-width: 640px) {
      height: 35px;
      width: 35px;
    }

    svg {
      width: 14px;
    }

    &.disabled {
      color: #a6a6a6;
      pointer-events: none;
    }

    &:not(&.disabled):hover,
    &.active {
      background: #004098;
      color: white;
      cursor: pointer;
    }
  }
`;
