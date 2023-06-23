import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link as NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../../images/logo.svg';
import { Icon } from '../../../ui';
import { Logo, Top as Root } from '../index';
import { api } from '../../../api';
import { useOutsideClick } from '../../../hooks';
import { useTranslation } from 'react-i18next';

export const Top = () => {
  const contacts = useSelector(state => state.main.contacts);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const ref = useRef();
  const inputRef = useRef();
  useOutsideClick(ref, () => setDropdownOpen(false));

  const onSearch = e => {
    if (e.target.value.length === 0) {
      setDropdownOpen(false);
      return;
    }
    setDropdownOpen(true);
    api(`announcement/?search=${e.target.value}`)
      .then(({ data }) => setData(data.results))
      .catch(console.log);
  };

  return (
    <Root>
      {window.innerWidth > 1024 && (
        <Logo to="/">
          <img src={logo} />
        </Logo>
      )}
      <Search ref={ref}>
        <SearchIcon id="search" />
        <input type="text" onChange={onSearch} ref={inputRef} />
        {dropdownOpen && (
          <Dropdown>
            {data.map(({ id, title }) => (
              <NavLink
                key={id}
                to={`/news/${id}`}
                onClick={() => {
                  setDropdownOpen(false);
                  inputRef.current.value = '';
                }}
              >
                {title}
              </NavLink>
            ))}
            {data.length === 0 && <span>{t('empty')}</span>}
          </Dropdown>
        )}
      </Search>
      <Links>
        {contacts?.phone1 && (
          <Link href={`tel:${contacts.phone1}`}>
            <Icon id="phone" />
            {contacts.phone1}
          </Link>
        )}
        {contacts?.phone2 && (
          <Link href={`tel:${contacts.phone2}`}>
            <Icon id="phone" />
            {contacts.phone2}
          </Link>
        )}
        <Link style={{ whiteSpace: 'break-spaces' }}>
          <Icon id="calendar" />
          {contacts?.graph}
        </Link>
      </Links>
      <Socials>
        {contacts?.instagram && (
          <Social href={contacts.instagram} target="_blank">
            <Icon id="instagram" />
          </Social>
        )}
        {contacts?.whatsapp && (
          <Social href={contacts.whatsapp} target="_blank">
            <Icon id="whatsapp" />
          </Social>
        )}
      </Socials>
    </Root>
  );
};

const SearchIcon = styled(Icon)``;

const Dropdown = styled.div`
  border: 1px solid #004098;
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  background: white;
  border-radius: 15px;
  z-index: 2;
  overflow: hidden;

  a,
  span {
    text-decoration: none;
    font-size: 14px;
    color: #0c101a;
    display: block;
    padding: 5px 10px;

    &:first-child {
      padding-top: 10px;
    }

    &:last-child {
      padding-bottom: 10px;
    }
  }

  a:hover {
    color: white;
    background: #004098;
  }

  span {
    text-align: center;
  }
`;

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
  transition: 0.15s;

  &:hover {
    background: #004098;

    svg {
      color: white;
      transition: 0.15s;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    color: #004098;
  }
`;

const Socials = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;
