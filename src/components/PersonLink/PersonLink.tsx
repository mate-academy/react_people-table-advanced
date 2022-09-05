import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
