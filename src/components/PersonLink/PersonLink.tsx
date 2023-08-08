import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Person, PersonSex } from '../../types';

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
      className={cn({
        'has-text-danger': person.sex === PersonSex.Female,
      })}
    >
      {person.name}
    </Link>
  );
};
