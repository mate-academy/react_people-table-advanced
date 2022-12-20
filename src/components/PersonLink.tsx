import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

const PersonLink: React.FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
