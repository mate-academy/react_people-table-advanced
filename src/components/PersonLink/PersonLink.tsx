import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParam] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParam.toString(),
      }}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
