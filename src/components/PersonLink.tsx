import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  const [searchParams] = useSearchParams();

  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={{ pathname: `/people/${slug}`, search: searchParams.toString() }}
    >
      {name}
    </Link>
  );
};
