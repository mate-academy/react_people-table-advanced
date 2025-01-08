import React from 'react';
import { Person, PersonSex } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search }}
      className={classNames({
        'has-text-danger': person.sex === PersonSex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
