import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  search?: string;
};

export const PersonLink: React.FC<Props> = ({ person, search = '' }) => {
  return (
    <Link
      to={{
        pathname: `../${person.slug}`,
        search: search,
      }}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
