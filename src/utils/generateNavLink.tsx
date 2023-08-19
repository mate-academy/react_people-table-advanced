import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import { setPersonLinkClassName } from './classNamesSetter';

export const generateNavLink = (
  person: Person, searchParams: URLSearchParams,
) => {
  const { name, slug } = person;

  return (
    <NavLink
      to={{
        pathname: `/people/${slug}`,
        search: searchParams?.toString(),
      }}
      className={setPersonLinkClassName(person)}
    >
      {name}
    </NavLink>
  );
};
