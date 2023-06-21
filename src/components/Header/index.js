import React, { useEffect, useRef, useState } from 'react';
import { Link as NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '../../images/logo.png';
import { Container } from '../Container';
import { Top as TopRoot, Bottom } from './components';
import { Icon } from '../../ui';
import { useOutsideClick } from '../../hooks';

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef();
  const { pathname } = useLocation();
  useOutsideClick(langRef, () => setLangDropdownOpen(false));

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <>
      {window.innerWidth < 1025 && (
        <Root $mobile>
          <Top $mobile>
            <Logo to="/">
              <img src={logo} />
            </Logo>
            <div ref={langRef} style={{ position: 'relative' }}>
              <Language onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                <Icon id="globus" />
                RU
              </Language>
              {langDropdownOpen && <AvailableLang>KR</AvailableLang>}
            </div>
            <Burger id="burger" onClick={() => setNavOpen(true)} />
          </Top>
        </Root>
      )}
      <Root $open={navOpen}>
        <Close id="close" onClick={() => setNavOpen(false)} />
        <TopRoot />
        <Bottom
          ref={langRef}
          langDropdownOpen={langDropdownOpen}
          setLangDropdownOpen={setLangDropdownOpen}
        />
      </Root>
      <OverlayClose $visible={navOpen} onClick={() => setNavOpen(false)} />
    </>
  );
};

const Root = styled.header`
  background: white;
  display: flex;
  flex-direction: column;

  ${({ $mobile, $open }) =>
    !$mobile &&
    css`
      @media (max-width: 1024px) {
        position: fixed;
        top: 0;
        right: 0;
        background: #004098;
        flex-direction: column-reverse;
        justify-content: space-between;
        width: 100%;
        max-width: 300px;
        height: 100%;
        border-radius: 20px 0 0 20px;
        overflow: hidden;
        padding: 50px 10px 16px;
        transform: translateX(${$open ? 0 : '100%'});
        transition: 0.2s;
        opacity: ${$open ? 1 : 0};
        z-index: 20;
      }
    `}
`;

const OverlayClose = styled.div`
  background: rgba(0, 64, 152, 0.2);
  position: fixed;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: 0.15s;
  z-index: 10;

  ${({ $visible }) =>
    $visible &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

export const Top = styled(Container)`
  display: flex;
  align-items: center;
  margin: clamp(8px, 2vw, 14px) auto;

  ${({ $mobile }) =>
    !$mobile &&
    css`
      @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
      }
    `}
`;

export const Logo = styled(NavLink)`
  display: block;
  margin-right: 10px;
  cursor: pointer;

  img {
    display: block;
    height: clamp(43px, 4vw, 53px);
  }

  @media (max-width: 1024px) {
    margin-right: auto;
  }
`;

const Burger = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-left: 20px;
`;

export const Language = styled.div`
  height: clamp(32px, 3vw, 40px);
  border: 1px solid #ffffff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: clamp(14px, 1.5vw, 16px);
  color: white;
  padding: 0 10px;
  cursor: pointer;

  svg {
    margin-right: 8px;
    height: clamp(16px, 2vw, 20px);
    width: clamp(16px, 2vw, 20px);
  }

  @media (max-width: 1024px) {
    color: #252525;
    border-color: #252525;
    padding: 0 8px;
  }
`;

export const AvailableLang = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: clamp(32px, 3vw, 40px);
  color: #232323;
  font-size: clamp(14px, 1.5vw, 16px);
  background: white;
  width: 100%;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  border-radius: 30px;
  cursor: pointer;
`;

const Close = styled(Icon)`
  display: none;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 13px;
  right: 15px;
  color: white;

  @media (max-width: 1024px) {
    display: block;
  }
`;
