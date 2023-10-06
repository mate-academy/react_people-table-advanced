import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, FilterBySex } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const [params] = useSearchParams();
  const restOfParams = params.toString();

  return (
    <Link
      to={`../${slug}?${restOfParams}`}
      className={classNames({
        'has-text-danger': sex === FilterBySex.Female,
      })}
    >
      {name}
    </Link>
  );
};
