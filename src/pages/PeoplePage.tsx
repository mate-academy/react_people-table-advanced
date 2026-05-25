import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [allPeople, setAllPeople] = useState<Person[] | null>(null);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    getPeople()
      .then(people => {
        setAllPeople(people);
      })
      .catch(() => {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      })
      .finally(() => {
        setShowLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {allPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {showLoading && <Loader />}

              {showError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {allPeople && allPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {allPeople && allPeople.length > 0 && (
                <PeopleTable allPeople={allPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
