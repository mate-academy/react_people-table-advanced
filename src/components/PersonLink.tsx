import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Gender } from '../types/Gender';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': sex === Gender.Female })}
    >
      {name}
    </Link>
  );
};
