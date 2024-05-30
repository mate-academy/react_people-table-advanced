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
    const centuriesAsNumbers = centuries.map(Number);

    const filters: { condition: boolean; callback: (p: Person) => boolean }[] =
      [
        {
          condition: !!sex,
          callback: (person: Person) => person.sex === sex,
        },
        {
          condition: centuries.length > 0,
          callback: (person: Person) =>
            person.century !== undefined &&
            centuriesAsNumbers.includes(person.century),
        },
        {
          condition: !!query,
          callback: (person: Person) =>
            query
              ? person.name.toLowerCase().includes(query.toLowerCase())
              : true,
        },
      ];

    return filters.reduce((acc, { condition, callback }) => {
      if (condition) {
        return acc.filter(callback);
      }

      return acc;
    }, people);
  }, [people, centuries, query, sex]);

  const sortedFilteredPeople = useMemo(() => {
    if (!sortColumn) {
      return filteredPeople;
    }

    const comparePeople = (a: Person, b: Person) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA === undefined && valueB === undefined) {
        return 0;
      }

      if (valueA === undefined) {
        return 1;
      }

      if (valueB === undefined) {
        return -1;
      }

      if (sortDirection) {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      } else {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
    };

    return [...filteredPeople].sort(comparePeople);
  }, [filteredPeople, sortColumn, sortDirection]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(newParams => {
      newParams.set('query', event.target.value);

      return newParams;
    });
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
    const [order, sort] =
      column === sortColumn
        ? sortDirection
          ? [null, null]
          : ['desc', column]
        : [null, column];

    return { sex, query, centuries, sort, order };
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              onSearchChange={handleSearchChange}
              sex={sex ?? undefined}
              centuries={centuries.length ? centuries : undefined}
              query={query ?? undefined}
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
