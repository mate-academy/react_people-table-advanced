import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink = ({ name, people }: Props) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <>-</>;
  }

  const person = people.find(item => item.name === name);

  if (!person) {
    return <>{name}</>;
  }

  const queryString = searchParams.toString();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: queryString ? `?${queryString}` : '',
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
