import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${slug}`, search }}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
