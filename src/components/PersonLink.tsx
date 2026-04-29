import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Person, { Gender } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  const { slug, sex, name } = person;

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
      className={cn({
        'has-text-danger': sex === Gender.Female,
      })}
    >
      {name}
    </Link>
  );
};
