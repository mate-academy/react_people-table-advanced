import { FC } from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  name?: string | null;
  people: Person[];
  onSelectPerson?: (slug: string) => void;
};

export const PersonLink: FC<Props> = ({ name, people, onSelectPerson }) => {
  const foundPerson = people.find(p => p.name === name);
  const [searchParams] = useSearchParams();

  if (!name) {
    return <>-</>;
  }

  if (!foundPerson) {
    return <>{name}</>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${foundPerson.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': foundPerson.sex === 'f',
      })}
      onClick={() => onSelectPerson?.(foundPerson.slug)}
    >
      {foundPerson.name}
    </Link>
  );
};
