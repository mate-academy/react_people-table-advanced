import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Man } from '../types';
import './PersonName.scss';

type Props = {
  person: Man,
};

export const PersonName: React.FC<Props> = React.memo(({ person }) => {
  const { search } = useLocation();
  // eslint-disable-next-line
  console.log('render');

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={person.sex === 'm' ? 'Person__blue' : 'Person__red'}
    >
      {person.name}
    </Link>
  );
});
