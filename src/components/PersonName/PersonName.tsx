import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './PersonName.scss';

type Props = {
  person: Person;
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `${`/people/${slug}`}`,
        search,
      }}
      className={classNames(
        'personName-link',
        {
          'personName-link--female': sex === 'f',
          'personName-link--male': sex === 'm',
        },
      )}
    >
      {name}
    </Link>
  );
};
