import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}?${searchParams}`}
      className={cn('has-text-link', {
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
