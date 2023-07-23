import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person, PersonSex } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  const getTextColor = (sex: PersonSex) => (
    classNames({
      'has-text-danger': sex === PersonSex.Female,
    })
  );

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={getTextColor(person.sex as PersonSex)}
    >
      {person.name}
    </Link>
  );
};
