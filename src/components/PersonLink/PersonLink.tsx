import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: `${parentPath}:${slug}`,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
