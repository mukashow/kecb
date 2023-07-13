import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from '../ui';
import { useSearchParams } from 'react-router-dom';

export const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagesCount = useMemo(() => {
    const pageSize = searchParams.get('page_size');
    if (!pageSize || !count) return null;
    return Math.ceil(count / +pageSize);
  }, [searchParams, count]);

  const paginationArray = useMemo(() => {
    const curPage = +searchParams.get('page');
    const pages = [...Array(pagesCount).keys()];

    if (pages.length - curPage <= 5) {
      return pages.slice(pages.length - 6);
    }

    if (pages.length > 5) {
      return [...pages.slice(curPage - 1, curPage + 4), '...', pages.at(-1)];
    }

    return pages.slice(curPage - 1, curPage + 4);
  }, [pagesCount, searchParams]);

  return (
    <Root>
      <div
        aria-disabled={+searchParams.get('page') === 1}
        onClick={() =>
          setSearchParams({
            page: +searchParams.get('page') - 1,
            page_size: 10,
          })
        }
      >
        <Icon id="paginationArrow" />
      </div>
      {typeof pagesCount === 'number' &&
        !isNaN(pagesCount) &&
        paginationArray.map(key =>
          key === '...' ? (
            <div key={key} style={{ pointerEvents: 'none' }}>
              {key}
            </div>
          ) : (
            <div
              className={+searchParams.get('page') === key + 1 ? 'active' : ''}
              key={key}
              onClick={() => setSearchParams({ page: key + 1, page_size: 10 })}
            >
              {key + 1}
            </div>
          )
        )}
      <div
        style={{ transform: 'rotate(180deg)' }}
        aria-disabled={+searchParams.get('page') === pagesCount}
        onClick={() =>
          setSearchParams({
            page: +searchParams.get('page') + 1,
            page_size: 10,
          })
        }
      >
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

    &[aria-disabled='true'] {
      color: #a6a6a6;
      pointer-events: none;
    }

    &:not([aria-disabled='true']):hover,
    &.active {
      background: #004098;
      color: white;
      cursor: pointer;
    }
  }
`;
