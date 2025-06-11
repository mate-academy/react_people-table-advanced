import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

import { PeopleFilters, sortPeople } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const filters = {
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
    centuries: searchParams.getAll('centuries'),
  };

  const filteredPeople = sortPeople(people, {
    ...filters,
    centuries: filters.centuries.length ? filters.centuries : null,
  });

  useEffect(() => {
    setIsLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
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

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !error &&
                people.length > 0 &&
                filteredPeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  selectedPersonSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
