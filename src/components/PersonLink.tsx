import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';


type Props = {
  person: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
