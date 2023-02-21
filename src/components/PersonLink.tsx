import { FC } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <td>
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: location.search,
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
