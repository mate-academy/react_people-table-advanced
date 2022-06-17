import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person
};

const PersonName: React.FC<Props> = React.memo(({ person }) => {
  const location = useLocation();

  return (
    <Link
      style={person.sex === 'm' ? {
        color: 'rgb(0, 71, 171)',
        textDecoration: 'none',
      }
        : {
          color: 'rgb(255, 0, 0)',
          textDecoration: 'none',
        }}
      to={{
        pathname: `/peoplePage/${person.slug}`,
        search: location.search,
      }}
    >
      {person.name}
    </Link>
  );
});

export default PersonName;
