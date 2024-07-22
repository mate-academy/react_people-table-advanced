import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Person as PersonType } from '../types';

type Props = {
  person: PersonType;
  search: URLSearchParams;
};

export const PersonLink: React.FC<Props> = ({ person, search }) => {
  const { name, slug, sex } = person;
  const SEX_FEMALE = 'f';

  return (
    <Link
      to={{
        pathname: `${slug}`,
        search: search?.toString(),
      }}
      className={cn({ 'has-text-danger': sex === SEX_FEMALE })}
    >
      {name}
    </Link>
  );
};
