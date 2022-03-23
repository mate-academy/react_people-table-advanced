import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './PersonName.scss';

type Props = {
  person: Person
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({
        maleColor: person.sex === 'm',
        femaleColor: person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
