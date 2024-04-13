import { Link, useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';

import { Person } from '../types/Person';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const female = 'f';
  const isFemale = person.sex === female;

  return (
    <Link
      to={{
        pathname: person.slug,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person.name}
    </Link>
  );
};
