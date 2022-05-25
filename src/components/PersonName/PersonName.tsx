import React from 'react';
import {
  Link,
} from 'react-router-dom';

type Props = {
  person: UpdatedPersons | People,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  return (
    <>
      <Link
        to={person.slug}
        className={person.sex === 'm' ? 'blue' : 'red'}
      >
        {person.name}
      </Link>
    </>
  );
};
