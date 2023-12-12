import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
}

const setPersonClassNameProperty = (sex: string) => classNames({
  'has-text-danger': sex === 'f',
});

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={setPersonClassNameProperty(sex)}
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </Link>
  );
};
