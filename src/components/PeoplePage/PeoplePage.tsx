import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext, FilteredPeopleContext } from '../../peopleContext';
import { PeopleFilters } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(res => {
        setPeople(res);
        setFilteredPeople(() => res);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredPeople(() => filterPeople(people, searchParams));
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && filteredPeople.length <= 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              <PeopleContext.Provider value={people}>
                <FilteredPeopleContext.Provider value={filteredPeople}>
                  {<PeopleTable />}
                </FilteredPeopleContext.Provider>
              </PeopleContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
