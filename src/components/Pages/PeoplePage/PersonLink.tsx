import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
});

PersonLink.displayName = 'PersonLink';
