import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `${slug}`,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
