import React, { useEffect, useState } from 'react';
// import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        if (data.length === 0) {
          setError('There are no people on the server');
          setVisiblePeople([]);
        }
      })
      .catch(() => {
        setError('Something went wrong while fetching data');
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {/* <PeopleFilters
              people={people}
              setVisiblePeople={setVisiblePeople}
              visiblePeople={visiblePeople}
            /> */}
          </div>

          <div className="column">
            <div className="box table-container">
              {error ? (
                <p data-cy="peopleLoadingError">{error}</p>
              ) : (
                <>
                  <Loader />
                  {visiblePeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable
                      visiblePeople={visiblePeople}
                      people={people}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
