import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <td>
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: location.search,
        }}
        style={{
          textDecoration: 'none',
          color: person.sex === 'm' ? 'blue' : 'red',
        }}
      >
        {person.name}
      </Link>
    </td>
  );
};
