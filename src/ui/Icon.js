import React from 'react';
import spritePath from '../sprite.svg';

export const Icon = ({ id, width = 20, height = 20, className, ...props }) => {
  return (
    <svg className={className} width={width} height={height} {...props}>
      <use xlinkHref={`${spritePath}#${id}`} />
    </svg>
  );
};
