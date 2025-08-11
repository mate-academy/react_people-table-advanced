import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopeleContext } from '../store/PeopleContext';
import { Person } from '../types';

export const PeoplePage = () => {
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const { people, loading, errorMessage, loadPeople } =
    useContext(PeopeleContext);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters people={people} onPeople={setSortedPeople} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : !!sortedPeople.length ? (
                <PeopleTable people={sortedPeople} />
              ) : !!searchParams.size && !!people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
