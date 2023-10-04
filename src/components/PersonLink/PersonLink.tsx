import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { SEX_FEMALE } from '../../utils/variablesHelpers';

interface Props {
  person: Person
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`../${slug}`}
      className={cn({
        'has-text-danger': sex === SEX_FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
