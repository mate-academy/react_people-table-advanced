import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person;
  originalName?: string | null;
};
export const PersonLink = ({ person, originalName }: Props) => {
  if (!person) {
    return <span>{originalName || '-'}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {originalName || person.name}
    </Link>
  );
};
