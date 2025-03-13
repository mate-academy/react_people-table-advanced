import { useState, useEffect } from 'react';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { SortOrder } from '../types/SortOrder';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>({});

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoaderActive(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaderActive(false));
  }, []);

  const sortPeople = (persons: Person[], order: SortOrder) => {
    const foundEntry = Object.entries(order).find(
      ([, value]) => value !== undefined,
    );

    if (!foundEntry) {
      return persons;
    }

    const [sortKey, sortDirection] = foundEntry;

    return [...persons].sort((a, b) => {
      const aValue = a?.[sortKey as keyof Person] ?? '';
      const bValue = b?.[sortKey as keyof Person] ?? '';

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  useEffect(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = String(Math.ceil(person.born / 100) || 1);

        return centuries.includes(bornCentury);
      });
    }

    result = sortPeople(result, sortOrder);

    setFilteredPeople(prevFilteredPeople => {
      if (JSON.stringify(prevFilteredPeople) !== JSON.stringify(result)) {
        return result;
      }

      return prevFilteredPeople;
    });
  }, [sex, query, centuries, people, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              sex={sex}
              query={query}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoaderActive ? (
                <Loader />
              ) : isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : filteredPeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
