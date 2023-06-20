import React, { useRef, useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Container } from './Container';
import logo from '../images/logo.png';
import { Icon } from '../ui';
import { useOutsideClick } from '../hooks';

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef();
  useOutsideClick(langRef, () => setLangDropdownOpen(false));

  return (
    <>
      {window.innerWidth < 1025 && (
        <Root $mobile>
          <Top $mobile>
            <Logo src={logo} />
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
        <Top>
          {window.innerWidth > 1024 && <Logo src={logo} />}
          <Search>
            <SearchIcon id="search" />
            <input type="text" />
          </Search>
          <Links>
            <Link href="tel:+996 700 123 456">
              <Icon id="phone" />
              +996 700 123 456
            </Link>
            <Link href="tel:+996 700 123 456">
              <Icon id="phone" />
              +996 700 123 456
            </Link>
            <Link>
              <Icon id="calendar" />
              пн-пт 9:00 - 18:00
            </Link>
          </Links>
          <Socials>
            <Social>
              <Icon id="instagram" width={16} height={16} />
            </Social>
            <Social>
              <Icon id="whatsapp" width={17} height={18} />
            </Social>
          </Socials>
        </Top>
        <Bottom>
          <BottomInner>
            <Navigation>
              <NavDropdownBtn>
                О центре <Icon id="arrowDown" width={16} height={16} />
                <NavDropdown>
                  <NavDropdownLink>Приветственное слово директора</NavDropdownLink>
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
        </Bottom>
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

const Top = styled(Container)`
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

const Logo = styled.img`
  display: block;
  height: clamp(43px, 4vw, 53px);
  margin-right: 10px;

  @media (max-width: 1024px) {
    margin-right: auto;
  }
`;

const Burger = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-left: 20px;
`;

const SearchIcon = styled(Icon)``;

const Search = styled.div`
  height: 30px;
  border: 1px solid #004098;
  border-radius: 30px;
  max-width: 250px;
  width: 100%;
  display: flex;
  position: relative;
  margin-left: auto;

  @media (max-width: 1024px) {
    border-color: white;
    color: white;
    height: 36px;
    margin-left: 0;
  }

  input {
    height: 100%;
    width: 100%;
    border: none;
    background: transparent;
    padding-left: 30px;
    position: relative;
    z-index: 1;

    @media (max-width: 1024px) {
      color: white;
    }
  }

  ${SearchIcon} {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 7px;
  }
`;

const Link = styled.a`
  font-size: 14px;
  color: #004098;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: 0.15s;
  white-space: nowrap;

  @media (max-width: 1024px) {
    color: white;
  }

  &:not(:last-child):hover {
    color: #84c2fd;
  }

  svg {
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

const Links = styled.div`
  display: flex;
  margin: 0 20px;

  & > *:not(:last-child) {
    margin-right: 20px;

    @media (max-width: 1024px) {
      margin: 0 0 20px 0;
    }
  }

  @media (max-width: 1024px) {
    margin: 20px 0;
    flex-direction: column;
  }
`;

const Social = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #004098;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Socials = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const Bottom = styled.div`
  background: #004098;
`;

const BottomInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Language = styled.div`
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

const AvailableLang = styled.div`
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

const Close = styled(Icon)`
  display: none;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 13px;
  right: 15px;

  @media (max-width: 1024px) {
    display: block;
  }
`;
