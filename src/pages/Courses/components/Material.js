import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocCard, SectionTitle } from '../../../components';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';
import JsFileDownloader from 'js-file-downloader';

const Item = item => {
  const [loading, setLoading] = useState(false);

  const onDownload = async () => {
    setLoading(true);
    await new JsFileDownloader({ url: item.file });
    setLoading(false);
  };

  return item.type === 'Файл' ? (
    <div
      style={{ cursor: 'pointer', pointerEvents: loading ? 'none' : 'auto' }}
      onClick={onDownload}
    >
      <DocCard {...item} loading={loading} />
    </div>
  ) : (
    <a key={item.id} style={{ textDecoration: 'none' }} href={item.link} target="_blank">
      <DocCard {...item} iconId="link" />
    </a>
  );
};

export const Material = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    api('lessonmaterials/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, [i18n.language]);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        {t('materialForLesson')}
      </SectionTitle>
      <Grid>
        {data.map(item => (
          <Item {...item} key={item.id} />
        ))}
      </Grid>
    </Root>
  );
};

const Root = styled.div`
  @media (max-width: 640px) {
    & > div:first-child svg {
      display: none;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: clamp(20px, 2.5vw, 30px);
`;
