import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gender, Person } from '../types/Person';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { slug, name, sex } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={classNames({ 'has-text-danger': sex === Gender.Female })}
    >
      {name}
    </Link>
  );
};
