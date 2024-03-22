import { Link, useSearchParams  } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  name: string;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  const [searchParams] = useSearchParams();
  const person = people.find(p => p.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  const to = {
    pathname: `/people/${person.slug}`,
    search: searchParams.toString()
  };

  return (
    <Link
      to={to}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
