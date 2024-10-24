import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';

import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `../${slug}`, search }}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
