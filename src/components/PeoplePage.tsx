import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleError, setPeopleError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [searchFail, setSearchFail] = useState(false);

  useEffect(() => {
    async function fetchPeople() {
      try {
        setLoading(true);
        const result = await getPeople();

        setPeople(result);
      } catch {
        setPeopleError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {peopleError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!peopleError && people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
{/*
              {searchFail && (
                <p>There are no people matching the current search criteria</p>
              )} */}

              {people.length > 0 && !loading && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
