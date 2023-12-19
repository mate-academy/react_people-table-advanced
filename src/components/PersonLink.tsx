import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

const WOMAN = 'has-text-danger';

export const PersonLink: React.FC<PersonLinkProps> = ({
  person: { name, sex, slug },
}) => {
  const [params] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: params.toString(),
      }}
      className={cn({
        [WOMAN]: sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
