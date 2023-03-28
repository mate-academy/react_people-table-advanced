import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;
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
