import { Link, useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
