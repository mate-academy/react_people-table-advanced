import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonNavLink: FC<Props> = ({ person }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const { name, slug, sex } = person;

  return (
    <Link
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
