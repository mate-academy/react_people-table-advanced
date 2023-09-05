import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
// import { SortBy } from './enums/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => {
    let filteredPeople = people.map(person => {
      const mother = people
        .find(mom => person.motherName === mom.name) || undefined;

      const father = people
        .find(dad => person.fatherName === dad.name) || undefined;

      return {
        ...person,
        mother,
        father,
      };
    });

    if (query) {
      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
      ));
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => centuries
        .find(century => Math.ceil(person.born / 100) === +century));
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (sort) {
      filteredPeople = filteredPeople.sort((a, b) => {
        if (sort === 'name' || sort === 'sex') {
          return order
            ? b[sort].localeCompare(a[sort])
            : a[sort].localeCompare(b[sort]);
        }

        if (sort === 'born' || sort === 'died') {
          return order
            ? +b[sort] - +a[sort]
            : +a[sort] - +b[sort];
        }

        return 0;
      });
    }

    return filteredPeople;
  }, [people, query, centuries, sex, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length < 1 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && preparedPeople.length < 1 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isError && people.length > 0
              && preparedPeople.length > 0 && (
                <PeopleTable
                  people={preparedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
