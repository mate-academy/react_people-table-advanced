import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNameFilterChange = (query: string) => {
    setSearchParams(getSearchWith(searchParams, { query: query || null }));
  };

  const handleCenturyFilterChange = (century: string, isSelected: boolean) => {
    const currentCenturies = searchParams.getAll('centuries');
    const updatedCenturies = isSelected
      ? currentCenturies.filter(c => c !== century)
      : [...currentCenturies, century];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: updatedCenturies.length ? updatedCenturies : null,
      }),
    );
  };

  const handleSexFilterChange = (sex: string | null) => {
    setSearchParams(getSearchWith(searchParams, { sex: sex || null }));
  };

  const handleSort = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    let newSort = field;
    let newOrder = 'asc';

    if (currentSort === field) {
      if (currentOrder === 'asc') {
        newOrder = 'desc';
      } else if (currentOrder === 'desc') {
        newSort = '';
        newOrder = '';
      }
    }

    setSearchParams(
      getSearchWith(searchParams, {
        sort: newSort || null,
        order: newOrder || null,
      }),
    );
  };

  const filteredPeople = people.filter(person => {
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuries = searchParams.getAll('centuries').map(Number);
    const sexFilter = searchParams.get('sex');
    const matchesQuery = person.name.toLowerCase().includes(query);
    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(Math.ceil(person.born / 100));
    const matchesSex = !sexFilter || person.sex === sexFilter;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order') === 'desc' ? -1 : 1;

    if (!sortField) {
      return 0;
    }

    const valueA = a[sortField as keyof Person];
    const valueB = b[sortField as keyof Person];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * sortOrder;
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return (valueA - valueB) * sortOrder;
    }

    return 0;
  });

  if (loading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </>
    );
  }

  if (hasError) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              onNameFilterChange={handleNameFilterChange}
              onCenturyFilterChange={handleCenturyFilterChange}
              onSortChange={handleSort}
              onSexFilterChange={handleSexFilterChange}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {filteredPeople.length > 0 ? (
                <PeopleTable
                  people={sortedPeople}
                  sortField={searchParams.get('sort')}
                  sortOrder={searchParams.get('order')}
                  onSortChange={handleSort}
                />
              ) : (
                <p data-cy="noPeopleMessage">
                  {people.length > 0
                    ? 'There are no people matching the current search criteria'
                    : 'There are no people on the server'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
