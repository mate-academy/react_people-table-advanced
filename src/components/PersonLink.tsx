import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  personName: string;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return '-';
  }

  const matchedPerson = people.find(person => person.name === personName);

  if (!matchedPerson) {
    return <>{personName}</>;
  }

  return (
    <Link
      to={`/people/${matchedPerson.slug}`}
      className={matchedPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {matchedPerson.name}
    </Link>
  );
};
