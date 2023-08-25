import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person, PersonSex } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': person.sex === PersonSex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
