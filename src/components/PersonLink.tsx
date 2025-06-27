import { NavLink, useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../types';
import { Gender } from '../types/Gender';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': person.sex === Gender.Female,
      })}
    >
      {person.name}
    </NavLink>
  );
};
