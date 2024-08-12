import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const { sex, slug, name } = person;
  const location = useLocation();

  enum Sex {
    Male = 'm',
    Female = 'f',
  }

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === Sex.Female })}
    >
      {name}
    </Link>
  );
};
