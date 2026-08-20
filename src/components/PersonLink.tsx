import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import type { Person } from '../types';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
