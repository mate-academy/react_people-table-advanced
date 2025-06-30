import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Partial<Person> | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person?.slug) {
    return <span>{person?.name || '-'}</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
