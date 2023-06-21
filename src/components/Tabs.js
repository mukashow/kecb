import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const Tabs = ({ tabs }) => {
  const { pathname } = useLocation();

  return (
    <Root>
      {tabs.map(({ title, path }) => (
        <Tab key={path} $active={pathname === path} to={path}>
          {title}
        </Tab>
      ))}
    </Root>
  );
};

const Tab = styled(Link)`
  height: clamp(40px, 4vw, 46px);
  padding: 0 clamp(20px, 2.5vw, 30px);
  display: flex;
  align-items: center;
  color: ${({ $active }) => ($active ? 'white' : '#2D2D2D')};
  font-size: clamp(14px, 1.5vw, 16px);
  text-decoration: none;
  white-space: nowrap;
  background: ${({ $active }) => ($active ? '#004098' : 'transparent')};
  border-radius: 30px;

  @media (max-width: 1024px) {
    border: 1px solid #004098;
  }
`;

const Root = styled.div`
  background: #f0f4f9;
  border: 1px solid #d7e0f4;
  border-radius: 30px;
  display: flex;
  margin: 0 auto;
  width: max-content;

  @media (max-width: 1024px) {
    display: grid;
    gap: 16px;
    background: none;
    border: none;
    justify-items: center;
  }
`;
