/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { Error } from '../types/Error';
import { Table } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { PeopleFilters } from './PeopleFilters';
import { getFamily } from '../utils/getFamily';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(Error.Default);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const loadPeople = () => {
    setIsLoading(true);
    setError(Error.Default);

    getPeople()
      .then(peop => {
        const peopleWithFamily = getFamily(peop);

        setPeople(peopleWithFamily);
      })
      .catch(() => setError(Error.Load))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const filteredAndSortedPeople = getFilteredPeople(getFamily(people), {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && !error && <Loader />}
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}
        {people.length === 0 && !error && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {!isLoading && people.length > 0 && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <Table people={filteredAndSortedPeople} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
