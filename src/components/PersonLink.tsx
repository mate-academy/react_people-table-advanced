import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person | undefined,
  personName: string | null,
}

export const PersonLink: FC<Props> = ({ person, personName }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <>
      {person ? (
        <Link
          to={{
            pathname: parentPath + person.slug,
            search: location.search,
          }}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      ) : (
        <p>{personName || '-'}</p>
      )}
    </>
  );
};
