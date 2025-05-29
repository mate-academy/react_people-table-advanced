import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Person {
  name: string;
  slug: string;
  sex: string;
}

interface PersonLinkProps {
  person?: Person;
  personName?: string;
  people: Person[];
  isMother?: boolean;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  personName,
  people,
  isMother = false,
}) => {
  const targetPerson =
    person ||
    (personName ? people.find(p => p.name === personName) : undefined);

  if (!targetPerson) {
    return <>{personName || '-'}</>;
  }

  return (
    <Link
      to={`/people/${targetPerson.slug}`}
      className={cn({
        'has-text-danger': isMother && targetPerson.sex === 'f',
      })}
    >
      {targetPerson.name}
    </Link>
  );
};
