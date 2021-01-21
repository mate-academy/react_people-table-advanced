import React, { useCallback } from 'react';
import {
  useLocation, useHistory,
} from 'react-router-dom';
import { ServerIPerson } from '../../api/interface';

import './PersonName.scss';

type PersonName = {
  person: ServerIPerson | undefined;
};

export const PersonName: React.FC<PersonName> = ({ person }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const history = useHistory();

  const handleNameClicked = useCallback(() => {
    searchParams.set('slug', person?.slug || '');
    history.push(`?${searchParams.toString()}`);
  }, [history, searchParams, person]);

  return (
    <span
      className={
        person?.sex === 'f' ? 'women' : 'men'
      }
      onClick={handleNameClicked}
      onKeyDown={handleNameClicked}
      role="button"
      tabIndex={0}
    >
      {person?.name}
    </span>
  );
};
