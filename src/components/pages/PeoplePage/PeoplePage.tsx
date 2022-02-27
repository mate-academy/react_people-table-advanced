import React from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { PeopleTable } from './PeopleTable';
import { usePeople } from '../../hooks/usePeople';

export const PeoplePage: React.FC = () => {
  const { people } = usePeople();

  return (
    <div>
      <h1 className="title">People page</h1>

      {people.length > 0 && (
        <PeopleTable />
      )}
    </div>
  );
};
