/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';

import { useHistory, useLocation } from 'react-router-dom';

export const PersonName = ({ person }) => {
  const { name, sex, born } = person;
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const handleCLick = (event) => {
    const formattedName = name.toLowerCase().split(' ').join('-');

    searchParams.set('slug', `${formattedName}-${born}`);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <button
      type="button"
      className={cn('button', {
        female: sex === 'f',
        male: sex === 'm',
      })}
      onClick={handleCLick}
    >
      {name}
    </button>
  );
};
