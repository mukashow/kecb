import React from 'react';
import { Icon, Text } from '../ui';
import styled from 'styled-components';

export const SectionTitle = ({
  color = 'black',
  fz = 'clamp(32px, 3vw, 40px)',
  iconHeight = 48,
  iconWidth = 48,
  fw = 700,
  mb,
  children,
}) => {
  return (
    <Root style={{ marginBottom: mb }}>
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 47 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_96_11599)">
          <path
            d="M29.2085 40.9394C33.4169 39.2584 35.8311 37.3069 38.2714 33.4951C40.7118 29.6833 39.4438 24.6926 35.632 22.2523C31.8202 19.8119 27.3663 21.3002 23.7729 24.5895C22.6359 25.6303 19.7184 27.683 18.1031 28.1759C15.2893 29.7199 6.40299 27.9018 7.41302 18.5692C4.22412 27.2668 8.67181 33.6394 9.85517 35.1903C16.3668 43.7241 26.6455 42.2269 29.2085 40.9394Z"
            fill="#02439B"
            fillOpacity="0.2"
          />
        </g>
        <g filter="url(#filter1_b_96_11599)">
          <path
            d="M17.474 8.0605C13.2656 9.74147 10.8514 11.693 8.41106 15.5048C5.97074 19.3165 7.23871 24.3073 11.0505 26.7476C14.8623 29.1879 19.3162 27.6997 22.9096 24.4104C24.0466 23.3695 26.964 21.3169 28.5794 20.8239C31.3932 19.28 40.2795 21.0981 39.2695 30.4307C42.4584 21.7331 38.0107 15.3605 36.8273 13.8096C30.3157 5.27579 20.0369 6.77293 17.474 8.0605Z"
            fill="#02439B"
            fillOpacity="0.2"
          />
        </g>
        <defs>
          <filter
            id="filter0_b_96_11599"
            x="-47.7175"
            y="-35.4308"
            width="141.238"
            height="131.367"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_96_11599" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_96_11599"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_b_96_11599"
            x="-46.8384"
            y="-46.9364"
            width="141.238"
            height="131.367"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_96_11599" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_96_11599"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <Text color={color} fz={fz} fw={fw} as="h2">
        {children}
      </Text>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 1330px) {
    svg {
      margin-right: 8px;
    }
  }

  @media (min-width: 1330px) {
    svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: calc(100% + clamp(8px, 2vw, 15px));
    }
  }
`;
