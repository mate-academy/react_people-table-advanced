import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sex = searchParams?.get('sex');
  const centuries = searchParams?.getAll('centuries') || [];
  const query = searchParams?.get('query') || '';
  const centuriesArr: string[] = ['16', '17', '18', '19', '20'];

  const [sortField, setSortField] = useState<keyof Person | null>(
    searchParams.get('sort') as keyof Person | null,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    searchParams.get('order') === 'desc' ? 'desc' : 'asc',
  );

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const arrUsers = await getPeople();

      if (!arrUsers.length) {
        setIsLoading(false);

        return;
      }

      setPeople(arrUsers);
      setIsDataFetched(true);
      setIsLoading(false);
    } catch {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const preparedPeopleWithParents = people.map((person) => ({
    ...person,
    mother: people.find((p) => p.name === (person.motherName || '-')),
    father: people.find((p) => p.name === (person.fatherName || '-')),
  }));

  const handleSortClick = (field: keyof Person) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortByField = (
    arr: Person[],
    field: keyof Person,
    order: 'asc' | 'desc',
  ) => {
    return [...arr].sort((a: Person, b: Person): number => {
      let aValue: number | string | null = null;
      let bValue: number | string | null = null;

      if (field === 'born' || field === 'died') {
        aValue = a[field];
        bValue = b[field];
      } else {
        aValue = a[field] as string | null;
        bValue = b[field] as string | null;
      }

      if (aValue === null && bValue === null) {
        return 0;
      }

      if (aValue === null) {
        return order === 'asc' ? -1 : 1;
      }

      if (bValue === null) {
        return order === 'asc' ? 1 : -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return order === 'asc'
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
  };

  const filteredPeople = useMemo(() => {
    let filtered = preparedPeopleWithParents;

    if (sex) {
      filtered = filtered.filter((person) => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(
        (person) => centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (query) {
      filtered = filtered.filter((person) => person.name.toLowerCase()
        .includes(query.toLowerCase())
          || person.fatherName?.toLowerCase().includes(query.toLowerCase())
          || person.motherName?.toLowerCase().includes(query.toLowerCase()));
    }

    if (!sortField) {
      return filtered;
    }

    return sortByField(filtered, sortField, sortOrder);
  }, [preparedPeopleWithParents, sortField, sortOrder, sex, centuries, query]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isDataFetched && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                centuries={centuries}
                query={query}
                centuriesArr={centuriesArr}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && !isDataFetched
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                )}

              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!people.length && isDataFetched
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  !isLoading && isDataFetched && filteredPeople.length > 0
                    && (
                      <PeopleTable
                        people={filteredPeople}
                        onSortClick={handleSortClick}
                        sortField={sortField}
                        sortOrder={sortOrder}
                      />
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
