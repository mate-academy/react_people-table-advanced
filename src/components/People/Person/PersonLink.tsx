import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../../types';

export const Personlink: FC<Pick<Person, 'name' | 'sex' | 'slug'>> = ({
  name,
  sex,
  slug,
}) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      replace
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
