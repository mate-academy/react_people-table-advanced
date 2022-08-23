import React from 'react';

import { PeopleTable } from '../../components/PeopleTable';
import { usePeople } from '../../components/hooks/usePeople';
import { Loader } from '../../components/Loader';

export const PeoplePage: React.FC = () => {
  const { people, loading, error } = usePeople();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="title">
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="title">People page</h1>

      {people.length > 0 && (
        <PeopleTable />
      )}
    </div>
  );
};
