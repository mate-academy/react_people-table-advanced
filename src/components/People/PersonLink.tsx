import React from 'react';
import { Person } from '../../types';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
  isPersonFemale: (human: Person) => boolean;
};

export const PersonLink: React.FC<Props> = ({ person, isPersonFemale }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={cn({ 'has-text-danger': isPersonFemale(person) })}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};
