import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { Sex } from '../../types/Sex';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const [searchParams] = useSearchParams();

  const isFemale = sex === Sex.FEMALE;

  return (
    <Link
      to={`../${slug}?${searchParams.toString()}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {name}
    </Link>
  );
};
