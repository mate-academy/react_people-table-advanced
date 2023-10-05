import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Gender, Person } from '../types';

type Props = {
  person: Person,
};

export const PersonalLink: React.FC<Props> = ({ person }) => {
  const [searchParam] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `../${person.slug}`,
        search: searchParam.toString(),
      }}
      // to={`../${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === Gender.FEMALE })}
    >
      {person?.name}
    </Link>
  );
};
