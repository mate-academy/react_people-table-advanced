import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={{ pathname: `../${person.slug}`, search: searchParams.toString() }}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </NavLink>
  );
};
