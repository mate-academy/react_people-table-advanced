import { Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink: React.FC<{
  person: Person | undefined;
  name: string;
  searchParams: URLSearchParams;
}> = ({ person, name, searchParams }) => {
  if (!person) {
    return <span>{name}</span>;
  }

  const linkClass = person.sex === 'f' ? 'has-text-danger' : '';
  const linkTo = `/people/${person.slug}?${searchParams.toString()}`;

  return (
    <Link to={linkTo} className={linkClass}>
      {name}
    </Link>
  );
};
