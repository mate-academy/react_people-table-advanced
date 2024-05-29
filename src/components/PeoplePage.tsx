import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleMap } from '../types/PeopleMap';

const getCentury = (year: number): number => {
  return Math.ceil(year / 100);
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { slug: selectedPersonSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sortColumn = searchParams.get('sort') as keyof Person | null;
  const sortDirection = searchParams.get('order') === 'desc';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPeople(
          fetchedPeople.map(person => ({
            ...person,
            century: person.born ? getCentury(person.born) : undefined,
          })),
        );
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    let filtered = people;
    const centuriesAsNumbers = centuries.map(Number);

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(
        person => person.century && centuriesAsNumbers.includes(person.century),
      );
    }

    if (query) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [people, centuries, query, sex]);

  const sortedFilteredPeople = useMemo(() => {
    if (!sortColumn) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      // Handle undefined values
      if (valueA === undefined) {
        return 1;
      }

      if (valueB === undefined) {
        return -1;
      }

      if (valueA < valueB) {
        return sortDirection ? 1 : -1;
      }

      if (valueA > valueB) {
        return sortDirection ? -1 : 1;
      }

      return 0;
    });
  }, [filteredPeople, sortColumn, sortDirection]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('query', event.target.value);
    setSearchParams(newParams);
  };

  const peopleMap: PeopleMap = useMemo(
    () =>
      people.reduce(
        (map, person) => ({
          ...map,
          [person.name]: person,
        }),
        {},
      ),
    [people],
  );

  const toggleArrow = (column: string) => {
    const order =
      column === sortColumn ? (sortDirection ? null : 'desc') : null;

    return { sex, query, centuries, sort: column, order };
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              onSearchChange={handleSearchChange}
              sex={sex ? sex : undefined}
              centuries={centuries ? centuries : undefined}
              query={query ? query : undefined}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : sortedFilteredPeople.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <PeopleTable
                  people={sortedFilteredPeople}
                  selectedPerson={selectedPersonSlug}
                  peopleMap={peopleMap}
                  onArrowClick={toggleArrow}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
