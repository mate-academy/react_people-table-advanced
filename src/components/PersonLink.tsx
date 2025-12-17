import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person;
  fallbackName?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, fallbackName }) => {
  const { search } = useLocation();

  if (person) {
    return (
      <NavLink
        to={{
          pathname: `/people/${person.slug}`,
          search: search,
        }}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </NavLink>
    );
  }

  return fallbackName || '-';
};
