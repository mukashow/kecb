import React from 'react';
import { Icon } from '../../../ui';
import styled, { css } from 'styled-components';
import { Container } from '../../Container';
import { Link as NavLink } from 'react-router-dom';
import { AvailableLang, Language } from '../index';

export const Bottom = React.forwardRef(({ setLangDropdownOpen, langDropdownOpen }, langRef) => {
  return (
    <Root>
      <BottomInner>
        <Navigation>
          <NavDropdownBtn>
            О центре <Icon id="arrowDown" width={16} height={16} />
            <NavDropdown>
              <NavDropdownLink to="/about">Приветственное слово директора</NavDropdownLink>
              <NavDropdownLink>История и основная информация центра</NavDropdownLink>
              <NavDropdownLink>Деятельность центра</NavDropdownLink>
            </NavDropdown>
          </NavDropdownBtn>
          <NavDropdownBtn>
            Объявления <Icon id="arrowDown" width={16} height={16} />
          </NavDropdownBtn>
          <NavDropdownBtn>
            Курсы центра <Icon id="arrowDown" width={16} height={16} />
          </NavDropdownBtn>
          <NavDropdownBtn>
            Обучения в Корее <Icon id="arrowDown" width={16} height={16} />
          </NavDropdownBtn>
          <NavDropdownBtn>
            Библиотека данных <Icon id="arrowDown" width={16} height={16} />
          </NavDropdownBtn>
          <NavDropdownBtnLink>Q&A</NavDropdownBtnLink>
        </Navigation>
        {window.innerWidth > 1024 && (
          <div ref={langRef} style={{ position: 'relative' }}>
            <Language onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
              <Icon id="globus" />
              RU
            </Language>
            {langDropdownOpen && <AvailableLang>KR</AvailableLang>}
          </div>
        )}
      </BottomInner>
    </Root>
  );
});

const Root = styled.div`
  background: #004098;
`;

const BottomInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavDropdownLink = styled(NavLink)`
  display: block;
  font-size: 14px;
  color: #2d2d2d;
  padding: 10px 20px;
  text-decoration: none;

  @media (max-width: 1024px) {
    color: white;
    padding: 10px;
  }
`;

const NavDropdown = styled.div`
  background: #ffffff;
  box-shadow: 0 2px 24px rgba(0, 64, 152, 0.1);
  border-radius: 0 0 20px 20px;
  padding: 12px 0;
  position: absolute;
  top: 100%;
  left: 20px;
  width: max-content;
  display: none;

  @media (max-width: 1200px) {
    left: 10px;
  }

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
    background: transparent;
    padding-bottom: 0;
  }
`;

const navDropdownBtnStyle = css`
  font-size: clamp(14px, 2vw, 16px);
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 24px 20px;
  cursor: default;
  position: relative;

  @media (max-width: 1200px) {
    padding: 24px 10px;
  }

  @media (max-width: 1024px) {
    padding: 10px;
    flex-wrap: wrap;
  }

  &:hover {
    color: #84c2fd;

    ${NavDropdown} {
      display: block;
    }
  }

  svg {
    margin-left: 8px;

    @media (max-width: 1024px) {
      margin-left: 20px;
    }
  }
`;

const NavDropdownBtn = styled.div`
  ${navDropdownBtnStyle}
`;

const NavDropdownBtnLink = styled(NavLink)`
  text-decoration: none;
  ${navDropdownBtnStyle}
`;

const Navigation = styled.nav`
  display: flex;
  margin: 0 -20px;

  @media (max-width: 1200px) {
    margin: 0 -10px;
  }

  @media (min-width: 1200px) {
    & > *:not(:last-child) {
      margin-right: clamp(0px, 1.5vw, 32px);
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
