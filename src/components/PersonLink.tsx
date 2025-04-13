import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person;
}

const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);

export default PersonLink;
