import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading
                ? (<Loader />)
                : (<PeopleTable people={people} />)}

              <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>

              <p>There are no people matching the current search criteria</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
