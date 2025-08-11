import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const searchString = searchParams.toString();

  return (
    <Link
      to={`../${person.slug}?${searchString}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
