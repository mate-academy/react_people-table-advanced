import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={{
        pathname: `../${person.slug}`,
        search: search.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};
