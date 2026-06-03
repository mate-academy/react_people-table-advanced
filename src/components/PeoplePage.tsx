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
    const normalizedQuery = query?.toLowerCase() || '';
    const sex = searchParams.get('sex') || null;
    const centuries = searchParams.getAll('centuries') || null;
    const bornCentury = Math.ceil(person.born / 100);
    const matchesName = person.name.toLowerCase().includes(normalizedQuery);
    const matchesMother =
      person.motherName?.toLowerCase().includes(normalizedQuery) ?? false;
    const matchesFather =
      person.fatherName?.toLowerCase().includes(normalizedQuery) ?? false;

    if (query && !matchesName && !matchesMother && !matchesFather) {
      return false;
    }

    if (sex && !(person.sex === sex)) {
      return false;
    }

    if (centuries.length > 0 && !centuries.includes(bornCentury.toString())) {
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

              {people.length > 0 && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  allPeople={people}
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
