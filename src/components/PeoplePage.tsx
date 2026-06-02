import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => setPeople(currentPeople))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    const query = searchParams.get('query') || null;
    const sex = searchParams.get('sex') || null;
    const centuries = searchParams.getAll('centuries') || null;
    const diedCentury = Math.ceil(person.died / 100);

    if (query && !person.name.toLocaleLowerCase().includes(query)) {
      return false;
    }

    if (sex && !(person.sex === sex)) {
      return false;
    }

    if (centuries.length > 0 && !centuries.includes(diedCentury.toString())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              <Loader load={isLoading} />

              {errorMessage && !isLoading && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/*
              <p>There are no people matching the current search criteria</p>
              */}

              {!isLoading && (
                <PeopleTable
                  people={visiblePeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
