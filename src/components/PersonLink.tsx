import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  person?: Person;
  name?: string | null;
};

const PersonLink: React.FC<Props> = ({ person, name }) => {
  const [searchParams] = useSearchParams();

  if (person) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: getSearchWith(searchParams, {}),
        }}
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
