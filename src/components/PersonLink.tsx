import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
};

const PersonLink: FC<Props> = ({ name, people }) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

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

export default PersonLink;
