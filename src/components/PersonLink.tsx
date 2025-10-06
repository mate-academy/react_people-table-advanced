import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  if (!person.slug) {
    return (
      <span className={classNames({ 'has-text-danger': person.sex === 'f' })}>
        {person.name}
      </span>
    );
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};
