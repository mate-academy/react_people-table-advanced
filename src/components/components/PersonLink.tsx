import { Person } from '../../types';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

interface PersonLinkProps {
  person: Person;
}

const PersonLink = ({ person }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
