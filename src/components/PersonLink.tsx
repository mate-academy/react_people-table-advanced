import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { useNavigate, useLocation } from "react-router-dom";


type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  if (!person) {
    return null;
  }

  return (
    <button
      data-cy="person"
      onClick={() => {
        navigate(`/people/${person.slug}${search}`);
      }}
      className={classNames('', {
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </button>
  );
};
