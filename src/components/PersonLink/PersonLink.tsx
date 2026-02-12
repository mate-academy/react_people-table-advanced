import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  person?: Person | string | null;
  foundPerson?: string | null;
}

export const PersonLink: React.FC<Props> = ({ person, foundPerson }) => {
  const name =
    (typeof person === 'object' ? person?.name : person) || foundPerson;

  if (!name) {
    return <span className="has-text-grey-light">-</span>;
  }

  if (person && typeof person === 'object') {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'f',
        })}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
