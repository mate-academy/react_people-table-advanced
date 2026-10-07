import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import type { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString() ? `?${searchParams}` : '',
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
