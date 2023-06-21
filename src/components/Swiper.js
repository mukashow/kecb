import { css } from 'styled-components';

export const Pagination = css`
  bottom: 0 !important;

  .swiper-pagination-bullet {
    opacity: 0.5 !important;
    max-width: clamp(60px, 7vw, 100px);
    width: 100%;
    background: #4361ee;
    height: 4px;
    border-radius: 2px;
    margin: 0 clamp(12px, 3vw, 20px) !important;

    &.swiper-pagination-bullet-active {
      opacity: 1 !important;
    }
  }
`;

export const Navigation = css`
  width: clamp(32px, 5vw, 70px);
  height: clamp(32px, 5vw, 70px);
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
`;
