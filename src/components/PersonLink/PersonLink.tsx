import React from 'react';
import {
  Link,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person | null;
  personParent?: string;
};

export const PersonLink: React.FC<Props> = ({ person, personParent }) => {
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
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </Link>
      ) : (
        `${personParent}`
      )}
    </>
  );
};
