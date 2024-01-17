import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parrent: Person;
};

export const PersonLink = ({ parrent }: Props) => {
  const { name, slug, sex } = parrent;

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
