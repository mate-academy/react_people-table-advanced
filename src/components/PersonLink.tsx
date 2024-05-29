import { Link } from 'react-router-dom';
import { Person } from '../types';

const formalizeSlug = (name: string, born: number) => {
  return `${name.replace(/\s+/g, '-').toLowerCase()}-${born}`;
};

export const PersonLink = ({ person }: { person: Person }) => {
  const applyStyles = (personSex: string) => {
    return personSex === 'f' ? 'has-text-danger' : '';
  };

  return (
    <Link
      to={`/people/${formalizeSlug(person.name, person.born)}`}
      className={`person-link ${applyStyles(person.sex)}`}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
