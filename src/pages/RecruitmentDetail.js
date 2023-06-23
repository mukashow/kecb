import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, PopupSlider, SectionTitle } from '../components';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Icon, Text } from '../ui';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import img from '../images/image.svg';
import JsFileDownloader from 'js-file-downloader';

export const RecruitmentDetail = () => {
  const [popupImages, setPopupImages] = useState([]);
  const [data, setData] = useState(null);
  const { i18n, t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    api(`student_recruitment_announcements/${id}/`)
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);
  return (
    <>
      <Helmet>
        <title>{t('educInKorea')}</title>
      </Helmet>
      <Root>
        <SectionTitle mb={14}>{data?.title}</SectionTitle>
        <Head>
          {/*<Text>{data?.category}</Text>*/}
          {data && <Text>{new Date(data.data).toLocaleDateString()}</Text>}
        </Head>
        <Content dangerouslySetInnerHTML={{ __html: data?.description }} />
        <Files>
          {data?.files.map(file => (
            <File key={file.id} onClick={() => new JsFileDownloader({ url: file.file })}>
              <Icon id="cloud" />
              {file.title}
            </File>
          ))}
        </Files>
        <Grid>
          {data?.images.map(({ image, id }) => (
            <div
              key={id}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => setPopupImages(data.images.map(({ image }) => image))}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </Grid>
      </Root>
      <PopupSlider
        images={popupImages}
        isOpen={!!popupImages.length}
        close={() => setPopupImages([])}
      />
    </>
  );
};

const Root = styled(Container)`
  padding: clamp(60px, 8vw, 100px) 20px;

  @media (max-width: 640px) {
    & > div:first-child svg {
      display: none;
    }
  }
`;

const Content = styled.div`
  * {
    color: #4d5257;
    line-height: 150%;
  }
`;

const Head = styled.div`
  font-size: clamp(14px, 2vw, 16px);
  color: #4d5257;
  font-weight: 300;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  gap: clamp(30px, 4vw, 60px);
  margin-bottom: clamp(20px, 3vw, 40px);
`;

const File = styled.div`
  padding: clamp(10px, 1.2vw, 15px) clamp(20px, 2.5vw, 30px);
  font-size: clamp(14px, 1.6vw, 18px);
  border-radius: 30px;
  background: #fff;
  box-shadow: 4px 10px 30px 0 rgba(0, 0, 0, 0.06);
  color: #004098;
  display: grid;
  grid-template-columns: auto auto;
  gap: 15px;
  align-items: center;
  cursor: pointer;
`;

const Files = styled.div`
  display: grid;
  gap: 24px;
  margin: clamp(30px, 4vw, 50px) 0 clamp(40px, 5vw, 60px);
  justify-content: start;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);

  div {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    cursor: zoom-in;
  }

  img {
    visibility: hidden;

    @media (max-width: 420px) {
      height: 250px;
    }
  }
`;
