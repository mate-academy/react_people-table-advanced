import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { FEMALE } from '../../utils/constants';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const [params] = useSearchParams();

  return (
    <Link
      to={`../${slug}?${params.toString()}`}
      className={classNames({
        'has-text-danger': sex === FEMALE,
      })}
    >
      {name}
    </Link>
  );
};
