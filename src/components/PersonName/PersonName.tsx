import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Person } from '../../types/person';

type Props = {
  person: Person
};

const PersonName: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      style={{ color: person.sex === 'm' ? 'blue' : 'red' }}
    >
      {person?.name}
    </Link>
  );
};

export default PersonName;
