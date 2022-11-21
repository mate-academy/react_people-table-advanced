import { FC } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const location = useLocation();
  const isWomen = (personSex: string) => {
    return personSex === 'f';
  };

  return (
    <Link
      to={`/people/${person.slug}/${location.search}`}
      className={classNames(
        { 'has-text-danger': isWomen(person.sex) },
      )}
    >
      {person.name}
    </Link>
  );
};
