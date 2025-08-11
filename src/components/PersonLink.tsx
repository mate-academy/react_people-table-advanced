import { Link } from 'react-router-dom';

export const PersonLink = ({ person }) => {
  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name.trim()}
    </Link>
  );
};
