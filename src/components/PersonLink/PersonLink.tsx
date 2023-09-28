import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person, PersonSex } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const [params] = useSearchParams();

  const allParams = params.toString();

  return (
    <Link
      to={`${slug}?${allParams}`}
      className={
        classNames({
          'has-text-danger': sex === PersonSex.Female,
        })
      }
    >
      {name}
    </Link>
  );
};
