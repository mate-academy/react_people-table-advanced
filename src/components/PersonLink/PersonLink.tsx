import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Partial<Person>;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const location = useLocation();

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={({
        pathname: `/people/${slug}`,
        search: location.search,
      })}
    >
      {name}
    </Link>
  );
};
