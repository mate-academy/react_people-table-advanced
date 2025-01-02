import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { SexFilters } from '../utils/filterHelpers';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = props => {
  const { person } = props;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': person.sex === SexFilters.Female.charAt(0),
      })}
    >
      {person.name}
    </Link>
  );
};
