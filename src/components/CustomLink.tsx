import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  to: string;
  person: Person | null;
};

const FEMALE = 'f';

export const CustomLink: React.FC<Props> = ({ to, person }) => {
  const isDanger = person?.sex === FEMALE;
  let name = '';

  if (person) {
    name = person.name;
  }

  return (
    <Link
      to={to}
      className={cn({
        'has-text-danger': isDanger,
      })}
    >
      {name}
    </Link>
  );
};
