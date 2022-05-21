import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Child,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const [personSlug, setPersonSlug] = useState('');
  const location = useLocation();
  const slug = location.pathname.split('/')[2];

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames('Person__name', {
        highlight: personSlug === slug,
      })}
      style={{
        color: person.sex === 'm' ? 'blue' : 'red',
      }}
      onClick={() => setPersonSlug(person.slug)}
    >
      {person.name}
    </Link>
  );
};
