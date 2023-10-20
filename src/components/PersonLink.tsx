import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonType } from '../types';
import { FEMALE } from '../utils/constats';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const [searchParams] = useSearchParams();

  const isFemale = sex === FEMALE;

  return (
    <Link
      to={{
        pathname: slug,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': isFemale,
      })}
    >
      {name}
    </Link>
  );
};
