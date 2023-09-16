import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleList } from '../components/PeopleList';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filterPeople, setFilterPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(date => {
        setPeople(date);
        setFilterPeople(date);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              people={people}
              setFilterPeople={setFilterPeople}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && !isError ? (
                <Loader />
              ) : (
                <PeopleList
                  people={filterPeople}
                  peopleFromSesver={people}
                />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
