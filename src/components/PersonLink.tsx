import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${person.slug + search}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
