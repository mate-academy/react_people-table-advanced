import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(persons =>
        persons.map(person => ({
          ...person,
          mother: persons.find(mother => mother.name === person.motherName),
          father: persons.find(father => father.name === person.fatherName),
        })),
      )
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filterPeople = (filteredArr: Person[]) => {
    let filtered = [...filteredArr];

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filtered = filtered.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sortBy) {
      filtered.sort((pers1, pers2) => {
        switch (sortBy) {
          case SortBy.name:
          case SortBy.sex:
            return pers1[sortBy].localeCompare(pers2[sortBy]);

          case SortBy.born:
          case SortBy.died:
            return pers1[sortBy] - pers2[sortBy];

          default:
            return 0;
        }
      });
    }

    if (order) {
      filtered.reverse();
    }

    return filtered;
  };

  const filterdPeople = filterPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!error && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filterdPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && !!filterdPeople.length && (
                <PeopleTable people={filterdPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
