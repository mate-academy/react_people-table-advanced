import React from 'react';
import { Link } from 'react-router-dom';
import { Man } from '../types';
import './PersonName.scss';

type Props = {
  person: Man,
};

export const PersonName: React.FC<Props> = React.memo(({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'm' ? 'Person__blue' : 'Person__red'}
    >
      {person.name}
    </Link>
  );
});
