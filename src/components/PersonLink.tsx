import { Link } from 'react-router-dom';
import { PersonLinkProps } from '../types';

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const existingPerson = people.find(p => p.name === person);

  return existingPerson ? (
    <Link
      to={`/people/${existingPerson.slug}`}
      className={existingPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person}
    </Link>
  ) : (
    <span>{person || '-'}</span>
  );
};
