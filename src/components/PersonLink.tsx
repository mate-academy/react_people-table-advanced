import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../types';
import { SexValues } from '../types/SexValues';

type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`${person?.slug}`}
      className={cn({
        'has-text-danger': person?.sex === SexValues.Female,
      })}
    >
      {person?.name}
    </Link>
  );
};
