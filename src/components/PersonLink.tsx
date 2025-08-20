import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={{ pathname: '/people/' + person.slug, search: location.search }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
