import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const selectedGender = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const isReversed = searchParams.get('order') || null;
  const sortByURL = searchParams.get('sort') as keyof Person;
  const sortBy = sortByURL
    ? sortByURL.charAt(0).toUpperCase() + sortByURL.slice(1)
    : null;

  const loadPeople = async () => {
    try {
      const response = await getPeople();

      setPeople(response);
      setIsLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const visiblePeople = getVisiblePeople({
    people,
    selectedGender,
    query,
    selectedCenturies,
    sortBy,
    sortByURL,
    isReversed,
  });

  const preparedTable = visiblePeople.length && !isLoading
    ? (
      <PeopleTable
        people={visiblePeople}
        collection={people}
        sortBy={sortBy}
        isReversed={isReversed}
      />
    )
    : <p>There are no people matching the current search criteria</p>;

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {!isLoading && (
                <PeopleFilters
                  selectedGender={selectedGender}
                  query={query}
                  selectedCenturies={selectedCenturies}
                />
              )}
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading
                  ? <Loader />
                  : preparedTable}

                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!people.length && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
