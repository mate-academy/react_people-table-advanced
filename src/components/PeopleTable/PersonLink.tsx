import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink = ({ person, className }: Props) => {
  return (
    <Link
      className={className}
      to={{
        pathname: `../${person.slug}`,
        search: useLocation().search,
      }}
    >
      {person.name}
    </Link>
  );
};
