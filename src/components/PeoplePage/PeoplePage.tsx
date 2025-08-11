import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import React, { useEffect, useState } from 'react';

import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {<PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable people={people} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
