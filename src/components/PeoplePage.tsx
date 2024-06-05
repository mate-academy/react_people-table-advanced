import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

enum SortBy {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => setPersons([...response]))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let visiblePeople = [...persons];

    if (sex === 'm') {
      visiblePeople = persons.filter(person => person.sex === 'm');
    }

    if (sex === 'f') {
      visiblePeople = persons.filter(person => person.sex === 'f');
    }

    if (query !== null) {
      visiblePeople = visiblePeople.filter(
        person =>
          person.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sortBy) {
      visiblePeople.sort((pers1, pers2) => {
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

    if (sortOrder) {
      visiblePeople.reverse();
    }

    return visiblePeople;
  }, [persons, sex, query, centuries, sortBy, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!persons.length && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!persons.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !error && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  persons={persons}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
