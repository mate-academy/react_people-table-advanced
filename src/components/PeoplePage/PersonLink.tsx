import React from 'react';
import { Person } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  onHover: () => void;
};

export const PersonLink: React.FC<Props> = ({ person, onHover }) => {
  const navigate = useNavigate();

  if (!person) {
    return null;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      onMouseEnter={onHover}
      onClick={() => navigate(`/people/${person.slug}`)}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
