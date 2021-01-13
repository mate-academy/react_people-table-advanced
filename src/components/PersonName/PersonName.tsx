import React from 'react';
import {
  useLocation, useHistory,
} from 'react-router-dom';
import { Person, ServerIPerson } from '../../api/interface';

import './PersonName.scss';

type PersonName = {
  person: ServerIPerson | Person;
};

export const PersonName: React.FC<PersonName> = ({ person }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const history = useHistory();

  const handleNameClicked = () => {
    searchParams.set('slug', person.slug);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <span
      className={
        person.sex === 'f' ? 'women' : 'men'
      }
      onClick={handleNameClicked}
      onKeyDown={handleNameClicked}
      role="button"
      tabIndex={0}
    >
      {person.name}
    </span>
  );
};
