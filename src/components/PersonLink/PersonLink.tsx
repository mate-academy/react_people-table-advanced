import React from 'react';
import cn from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const location = useLocation();
  const parentsPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: parentsPath + slug,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
