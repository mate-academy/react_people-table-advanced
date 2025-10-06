import { useState, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLocaleLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('old');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleData)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = peopleData.filter(person => {
    if (query && !person.name.toLocaleLowerCase().includes(query)) {
      return false;
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length > 0) {
      const bornCentury = Math.floor(person.born / 100) + 1;

      if (!centuries.includes(bornCentury.toString())) {
        return false;
      }
    }

    return true;
  });

  const peopleToShow = filteredPeople.length > 0 ? filteredPeople : peopleData;

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && peopleData.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* eslint-disable @typescript-eslint/indent */}
              {!isLoading &&
                !error &&
                peopleData.length > 0 &&
                filteredPeople.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}
              {/* eslint-enable @typescript-eslint/indent */}

              {!isLoading && !error && peopleData.length > 0 && (
                <PeopleTable peopleData={peopleToShow} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
