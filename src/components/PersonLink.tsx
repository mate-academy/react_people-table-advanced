import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = { person: Person };

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
