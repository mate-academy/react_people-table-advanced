import { FC } from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person?: Person | null;
  parentName?: string;
}

export const PersonLink: FC<Props> = ({ person, parentName }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <span>{parentName || '-'}</span>;
  }

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
