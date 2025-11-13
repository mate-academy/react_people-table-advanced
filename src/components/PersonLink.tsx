import classNames from 'classnames';
import { Person } from '../types/Person';
import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';

interface Props {
  person?: Person;
  personName?: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, personName, people }) => {
  const currentPerson = person || people.find(p => p.name === personName);
  const [searchParams] = useSearchParams();

  if (!currentPerson) {
    return <span>{personName}</span>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${currentPerson.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': currentPerson.sex === 'f',
      })}
    >
      {currentPerson.name}
    </Link>
  );
};
