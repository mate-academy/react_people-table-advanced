import React from 'react';
import { Person } from '../../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};
const FEMALE_SEX = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': sex === FEMALE_SEX,
      })}
    >
      {name}
    </Link>
  );
};
