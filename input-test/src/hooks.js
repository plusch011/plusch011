import React from 'react';

export const getClassNames = (defaultClass ,className) => {
  const classNames = [defaultClass];

  className && classNames.push(className);

  return classNames.join(' ');
};
