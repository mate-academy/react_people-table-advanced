import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  person: Person
}

export const PersonName: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
        'has-text-info': person.sex === 'm',
      })}
    >
      {person.name}
    </Link>
  );
};

export default PersonName;
