import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import DG from '2gis-maps';
import { useSelector } from 'react-redux';
import blob from '../images/blob.svg';
import { Container } from './Container';
import { Icon, Text } from '../ui';

export const Footer = () => {
  const contacts = useSelector(state => state.main.contacts);
  const { t } = useTranslation();

  useEffect(() => {
    const link =
      'https://2gis.kg/bishkek/firm/70000001019329204/74.612502%2C42.878041?m=74.627208%2C42.870712%2F14.32';
    const coords = link
      .split('?m=')[0]
      .split('/')
      .at(-1)
      .split('%2C')
      .map(point => +point)
      .reverse();

    DG.then(() => {
      let map = DG.map('map', {
        center: coords,
        zoom: 13,
      });
      DG.marker(coords).addTo(map);
    });
  }, []);

  return (
    <Root>
      <Inner>
        <div>
          <Text as="h2" fz="clamp(32px, 3vw, 40px)" color="white" fw={700} mb={30}>
            {t('contacts')}
          </Text>
          <Links>
            {contacts?.phone1 && (
              <Link href={`tel:${contacts.phone1}`}>
                <Icon id="phone" />
                {contacts.phone1}
              </Link>
            )}
            {contacts?.email && (
              <Link href={`mailto:${contacts.email}`}>
                <Icon id="mail" />
                {contacts.email}
              </Link>
            )}
            {contacts?.phone2 && (
              <Link href={`tel:${contacts.phone2}`}>
                <Icon id="phone" />
                {contacts.phone2}
              </Link>
            )}
            {contacts?.street && (
              <Link $static>
                <Icon id="location" />
                {contacts.street}
              </Link>
            )}
          </Links>
          <Socials>
            {contacts?.instagram && (
              <Social href={contacts.instagram} target="_blank">
                <Icon id="instagram" />
              </Social>
            )}
            {contacts?.facebook && (
              <Social href={contacts.facebook} target="_blank">
                <Icon id="facebook" />
              </Social>
            )}
            {contacts?.twitter && (
              <Social href={contacts.twitter} target="_blank">
                <Icon id="twitter" />
              </Social>
            )}
            {contacts?.telegram && (
              <Social href={contacts.telegram} target="_blank">
                <Icon id="telegram" />
              </Social>
            )}
            {contacts?.youtube && (
              <Social href={contacts.youtube} target="_blank">
                <Icon id="youtube" />
              </Social>
            )}
            {contacts?.whatsapp && (
              <Social href={contacts.whatsapp} target="_blank">
                <Icon id="whatsapp" />
              </Social>
            )}
          </Socials>
        </div>
        <MapContainer>
          <Map id="map" />
          <MapButton>{t('setRoute')}</MapButton>
        </MapContainer>
      </Inner>
      <Copyright>Developed by Remotion</Copyright>
      <img src={blob} />
      <img src={blob} />
    </Root>
  );
};

const Root = styled.footer`
  background: #004098;
  padding: 60px 0 clamp(130px, 13vw, 140px);
  position: relative;
  overflow: hidden;

  & > img {
    display: block;
    position: absolute;
    bottom: 20px;
    left: 0;
    height: clamp(250px, 30vw, 380px);

    &:last-child {
      bottom: auto;
      left: auto;
      right: 0;
      top: -70px;
      transform: rotate(180deg);

      @media (max-width: 500px) {
        top: -40px;
      }
    }
  }
`;

const Inner = styled(Container)`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(50px, 15vw, 227px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Map = styled.div`
  height: 100%;
`;

const MapContainer = styled.div`
  position: relative;
  height: 210px;
  border-radius: 10px;
  overflow: hidden;
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 50px;
  row-gap: 20px;
  margin-bottom: 35px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  text-decoration: none;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  ${({ $static }) =>
    !$static &&
    css`
      &:hover {
        color: #84c2fd;
      }
    `}
`;

const Social = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid white;
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
  margin: -7.5px;

  & > * {
    margin: 7.5px;
  }
`;

const Copyright = styled.div`
  height: clamp(60px, 6vw, 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ababab;
  font-size: clamp(14px, 2vw, 16px);
  background: black;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const MapButton = styled.a`
  position: absolute;
  color: #004098;
  z-index: 1;
  bottom: 0;
  right: 0;
  padding: 20px 30px;
  background: #ffffff;
  border: 1px solid #004098;
  border-radius: 30px 0 0 0;
  border-right: none;
  border-bottom: none;
`;
