import React from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type PersonLinkProps = {
  person?: Person;
};

const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const location = useLocation();

  if (!person) {
    return null;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={{ pathname: person.slug, search: location.search }}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
