import React from 'react';

export default function Image({src, className}) {
  const imgUrl = IMAGE_URL; // eslint-disable-line
  const url = imgUrl + src;
  return (
    <img src={url} className={className} />
  );
}
