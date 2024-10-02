/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { PeopleTable, SortBy } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

type Filter = {
  query: string | null;
  sex: string | null;
  centuries: string[];
};

type Sort = {
  sortName: string | null;
  order: string | null;
};

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);

  const filterParams: Filter = {
    query: searchParams.get('query') || null,
    sex: searchParams.get('sex') || null,
    centuries: searchParams.getAll('centuries') || [],
  };

  const sortParams: Sort = {
    sortName: searchParams.get('sort') || null,
    order: searchParams.get('order') || null,
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const people: Person[] = peopleFromServer.map(person => ({
    ...person,
    mother: peopleFromServer.find(p => p.name === person.motherName),
    father: peopleFromServer.find(p => p.name === person.fatherName),
  }));

  const getPrepearedPeople = (people: Person[], filter: Filter, sort: Sort) => {
    let prepearedPeople = [...people];
    const { query, sex, centuries } = filter;
    const { sortName, order } = sort;

    if (query) {
      prepearedPeople = prepearedPeople.filter(
        p =>
          p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.motherName?.toLowerCase().includes(query.trim().toLowerCase()) ||
          p.fatherName?.toLowerCase().includes(query.trim().toLowerCase()),
      );
    }

    if (sex) {
      prepearedPeople = prepearedPeople.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      prepearedPeople = prepearedPeople.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sortName) {
      prepearedPeople.sort((a, b) => {
        switch (sortName) {
          case SortBy.name:
          case SortBy.sex:
            return a[sortName].localeCompare(b[sortName]);

          case SortBy.born:
          case SortBy.died:
            return a[sortName] - b[sortName];

          default:
            return 0;
        }
      });
    }

    if (order) {
      return prepearedPeople.reverse();
    }

    return prepearedPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && !!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && !!people.length && (
                <PeopleTable
                  people={getPrepearedPeople(people, filterParams, sortParams)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
