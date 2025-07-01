import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
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

  const filteredPeople = people.filter(person => {
    const sexFilter = searchParams.get('sex');
    const queryFilter = searchParams.get('query')?.toLowerCase();
    const centuryFilters = searchParams.getAll('centuries');

    return (
      (!sexFilter || person.sex === sexFilter) &&
      (!queryFilter ||
        (person.name && person.name.toLowerCase().includes(queryFilter)) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(queryFilter)) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(queryFilter))) &&
      (centuryFilters.length === 0 ||
        centuryFilters.includes(String(Math.ceil(person.born / 100))))
    );
  });

  return (
    <div className="container">
      <h1 className="title" data-cy="peoplePageTitle">
        People Page
      </h1>

      <div className="columns">
        <div className="column">
          <div className="block">
            <div className="box table-container" data-cy="peopleTableContainer">
              {isLoading && <Loader data-cy="loader" />}
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
              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  selectedPersonSlug={selectedPersonSlug}
                />
              )}
            </div>
          </div>
        </div>

        <div className="column is-one-quarter">
          <PeopleFilters isLoaded={people.length > 0} />
        </div>
      </div>
    </div>
  );
};
