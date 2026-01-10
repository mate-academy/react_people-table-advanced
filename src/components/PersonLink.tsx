import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person;
  setSelectedPerson?: (person: Person) => void;
}

const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  setSelectedPerson,
}) => {
  const handleClick = () => {
    setSelectedPerson?.(person);
  };

  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
