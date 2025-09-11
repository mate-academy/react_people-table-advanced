import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person;
  name?: string | null;
};

const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={cn('', {
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    );
  }

  return <>{name || '-'}</>;
};

export default PersonLink;
