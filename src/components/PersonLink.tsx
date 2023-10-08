import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../types/Person';

type Props = {
  person: Person | undefined,
  personName: string | null,
};

export const PersonLink: React.FC<Props> = ({ person, personName }) => {
  const [searchParameters] = useSearchParams();

  return (
    person ? (
      <Link
        to={`/people/${person.slug}?${searchParameters.toString()}`}
        className={cn({
          'has-text-danger': person.sex === 'f',
        })}
        replace
      >
        {person.name}
      </Link>
    ) : (
      <>
        {personName || '-'}
      </>
    )
  );
};
