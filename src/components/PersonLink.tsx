import { Link } from 'react-router-dom';
import { Person } from '../types';
import { Routes as AppRoutes } from '../utils/routes';

type Props = {
  person: Person;
  searchParams: URLSearchParams;
};

export const PersonLink: React.FC<Props> = ({ person, searchParams }) => (
  <Link
    className={person.sex === 'f' ? 'has-text-danger' : ''}
    to={{
      pathname: `/${AppRoutes.PEOPLE}/${person.slug}`,
      search: searchParams.toString(),
    }}
  >
    {person.name}
  </Link>
);
