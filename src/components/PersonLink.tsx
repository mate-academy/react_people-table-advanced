import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonSex } from '../types/PersonSex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();
  const { name, sex, slug } = person;

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === PersonSex.FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
