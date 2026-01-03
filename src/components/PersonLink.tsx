import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
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
    </td>
  );
};
