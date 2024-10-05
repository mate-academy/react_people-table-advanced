import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: {
    slug: string;
    sex: string;
  };
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();

  return (
    <Link
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
      to={`/people/${person.slug}${location.search}`}
    >
      {name}
    </Link>
  );
};
