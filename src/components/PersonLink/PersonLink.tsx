import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { getPersonSlug } from '../../utils/getPersonSlug';

type Props = {
  name: string;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, peopleList }) => {
  const person = peopleList.find(p => p.name === name);

  const { search } = useLocation();

  if (!person) {
    return <>{name || '-'}</>;
  }

  const slug = getPersonSlug(person.name, person.born);

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
