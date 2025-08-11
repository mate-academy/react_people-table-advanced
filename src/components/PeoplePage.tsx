import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const queryFilter = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries');
  const sexFilter = searchParams.get('sex') || null;

  const filteredPeople = useMemo(() => {
    let result = people;

    if (sexFilter) {
      result = result.filter(({ sex }) => sex === sexFilter);
    }

    if (queryFilter) {
      result = result.filter(
        ({ name, motherName, fatherName }) =>
          name.toLocaleLowerCase().includes(queryFilter) ||
          motherName?.toLocaleLowerCase().includes(queryFilter) ||
          fatherName?.toLocaleLowerCase().includes(queryFilter),
      );
    }

    if (centuriesFilter.length !== 0) {
      result = result.filter(({ born }) => {
        const bornCentury = Math.floor(born / 100) + 1;

        return centuriesFilter.map(str => Number(str)).includes(bornCentury);
      });
    }

    return result;
  }, [sexFilter, queryFilter, centuriesFilter, people]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && !errorMessage && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && filteredPeople.length === 0 && (
                <p data-cy="noMatchingPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
