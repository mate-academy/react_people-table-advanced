import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person : Person,
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
