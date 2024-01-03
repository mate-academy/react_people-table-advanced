import React from 'react';
import cn from 'classnames';

import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { GENDERS } from '../../enum/gendersEnum';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={cn({
        'has-text-danger': person.sex === GENDERS.f,
      })}
    >
      {person.name}
    </Link>
  );
};
