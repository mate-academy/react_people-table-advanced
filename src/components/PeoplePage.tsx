import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Sort } from '../types/Sort';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { people } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setData)
      .catch(() => setHasError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [people]);

  const getFilteredPeople = useCallback(() => {
    let filteredPeople = [...data];

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person => {
        return person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query);
      });
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(
        person => centuries.includes(
          String(Math.ceil(person.born / 100)),
        ),
      );
    }

    const sortMap: { [key: string]: (a: Person, b: Person) => number } = {
      [Sort.name]: (a, b) => a.name.localeCompare(b.name),
      [Sort.sex]: (a, b) => a.sex.localeCompare(b.sex),
      [Sort.born]: (a, b) => a.born - b.born,
      [Sort.died]: (a, b) => a.died - b.died,
    };

    if (sort) {
      filteredPeople.sort(sortMap[sort]);
    }

    if (order) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }, [centuries, data, order, query, sex, sort]);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {!isLoading && <PeopleFilters />}
        </div>

        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!getFilteredPeople().length && !isLoading && (
              <p>There are no people matching the current search criteria</p>
            )}
            {!isLoading && (
              !data.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                getFilteredPeople().length > 0
                  && <PeopleTable people={getFilteredPeople()} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
