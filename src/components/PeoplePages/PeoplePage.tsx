import React, { useContext } from 'react';
import { PeopleContext } from '../../hoc/PeopleProvider';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { people } = useContext(PeopleContext);

  return (
    <>
      <h2 className="subtitle is-3 has-text-centered">People page</h2>

      {people.length > 0 && (
        <div className="box px-2">
          <PeopleTable />
        </div>
      )}
    </>
  );
};
