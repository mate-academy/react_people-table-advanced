import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person?: Person;
  fallbackName?: string | null; // показати ім'я, якщо об'єкт не знайдений
};

export const PersonLink: React.FC<Props> = ({ person, fallbackName }) => {
  if (person) {
    return (
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
        >
          {person.name}
        </Link>
      </td>
    );
  }

  return <td>{fallbackName || '-'}</td>;
};
