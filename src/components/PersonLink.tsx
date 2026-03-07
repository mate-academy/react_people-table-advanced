import { Link } from 'react-router-dom';
import cn from 'classnames';
import type { Person } from '../types';
import { useSearchParamsContext } from '../store/SearchParamsContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { searchParams } = useSearchParamsContext();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
