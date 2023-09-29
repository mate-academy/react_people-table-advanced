import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

const FEMALE_SEX = 'f';

export const PeopleLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slug, sex, name } = person;

  return (
    <Link
      to={{ pathname: `${slug}`, search: searchParams.toString() }}
      className={classNames({
        'has-text-danger': sex === FEMALE_SEX,
      })}
    >
      {name}
    </Link>
  );
};
