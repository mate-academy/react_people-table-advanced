import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const isWoman = sex === 'f';
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={cn({
        'has-text-danger': isWoman,
      })}
    >
      {name}
    </Link>
  );
};
