import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink = ({ person, className }: Props) => {
  return (
    <Link className={className} to={`../${person.slug}`}>
      {person.name}
    </Link>
  );
};
