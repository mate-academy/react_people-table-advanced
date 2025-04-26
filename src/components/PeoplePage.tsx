import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pathParts = location.pathname.split('/');
  const selectedPersonSlug =
    pathParts.length === 3 && pathParts[1] === 'people' ? pathParts[2] : null;

  const isPeopleLoaded = !isLoading && !hasError && people.length > 0;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    if (!people.length) {
      return [];
    }

    let result = [...people];

    const sexFilter = searchParams.get('sex');

    if (sexFilter) {
      result = result.filter(person => person.sex === sexFilter);
    }

    const queryFilter = searchParams.get('query')?.toLowerCase();

    if (queryFilter) {
      result = result.filter(person => {
        return (
          (person.name && person.name.toLowerCase().includes(queryFilter)) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(queryFilter)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(queryFilter))
        );
      });
    }

    const centuryFilters = searchParams.getAll('centuries');

    if (centuryFilters.length > 0) {
      result = result.filter(person => {
        if (!person.born) {
          return false;
        }

        const century = Math.ceil(person.born / 100);

        return centuryFilters.includes(String(century));
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column">
          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleLoaded && (
                <PeopleTable
                  people={filteredPeople}
                  selectedPersonSlug={selectedPersonSlug}
                />
              )}
            </div>
          </div>
        </div>

        <div className="column is-one-quarter">
          <PeopleFilters isLoaded={isPeopleLoaded} />
        </div>
      </div>
    </div>
  );
};
