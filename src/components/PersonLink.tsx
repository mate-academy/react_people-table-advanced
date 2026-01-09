import { Link } from 'react-router-dom';
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

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
