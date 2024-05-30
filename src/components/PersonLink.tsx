import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();
  const { name, slug, sex } = person;

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
