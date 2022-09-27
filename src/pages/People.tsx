import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { getPeople } from '../api';

import { Person } from '../types';
import { sortPeople } from '../utils/sortHelper';
import { PeopleFilters } from '../components/PoppleFilters';
import { filterPeople } from '../utils/filterHelper';

export const People = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const peopleToDisplay = peopleFromServer
          .map(person => ({
            ...person,
            mother: peopleFromServer.find(
              somebody => somebody.name === person.motherName,
            ),
            father: peopleFromServer.find(
              somebody => somebody.name === person.fatherName,
            ),
          }));

        setPeople(peopleToDisplay);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = filterPeople(people, searchParams);
  const sortedPeople = sortPeople(filteredPeople, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}

              {people.length > 0 && !sortedPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
