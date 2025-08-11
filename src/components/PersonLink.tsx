import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { name, sex, slug },
}) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `../${slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
