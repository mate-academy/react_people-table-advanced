import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person | null;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={`/people/${person?.slug}?${searchParams.toString()}`}
      className={classNames({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {person?.name}
    </NavLink>
  );
};
