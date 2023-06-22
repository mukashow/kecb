import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DocCard, SectionTitle } from '../../../components';
import { api } from '../../../api';
import { useTranslation } from 'react-i18next';
import JsFileDownloader from 'js-file-downloader';

export const Material = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api('lessonmaterials/')
      .then(({ data }) => setData(data))
      .catch(console.log);
  }, []);

  return (
    <Root>
      <SectionTitle fz="clamp(20px, 3vw, 32px)" mb="clamp(20px, 3vw, 38px)">
        {t('materialForLesson')}
      </SectionTitle>
      <Grid>
        {data.map(item => (
          <div
            key={item.id}
            style={{ cursor: 'pointer' }}
            onClick={() => new JsFileDownloader({ url: item.file })}
          >
            <DocCard {...item} />
          </div>
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
